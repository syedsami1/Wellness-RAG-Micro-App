import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { safetyCheck } from "../safety/safetyCheck.js";
import { QueryLog } from "../db/models.js";

const router = express.Router();

/* ---------------- PATH RESOLUTION (ESM SAFE) ---------------- */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// routes -> backend -> project root
const projectRoot = path.resolve(__dirname, "../../");

// knowledge base absolute path
const knowledgeBasePath = path.join(
  projectRoot,
  "knowledge-base",
  "yoga_articles.json"
);

/* ---------------- LOAD KNOWLEDGE BASE ---------------- */

const articles = JSON.parse(
  fs.readFileSync(knowledgeBasePath, "utf-8")
);

/* ---------------- HELPER: SIMPLE RETRIEVAL + RANKING ---------------- */

function retrieveRelevantArticles(query, topK = 3) {
  const queryWords = query.toLowerCase().split(/\s+/);

  const scored = articles.map(article => {
    let score = 0;

    queryWords.forEach(word => {
      if (article.title.toLowerCase().includes(word)) {
        score += 3; // title match = strong signal
      }
      if (article.content.toLowerCase().includes(word)) {
        score += 1; // content match = weak signal
      }
    });

    return { ...article, score };
  });

  const ranked = scored
    .filter(a => a.score > 0)
    .sort((a, b) => b.score - a.score);

  return ranked.length > 0
    ? ranked.slice(0, topK)
    : articles.slice(0, topK);
}

/* ---------------- POST /ask ---------------- */

router.post("/", async (req, res) => {
  const { query } = req.body;

  // 1. Safety check
  const safety = safetyCheck(query);

  // 2. Retrieve relevant knowledge chunks
  const retrievedArticles = retrieveRelevantArticles(query, 2);

  // 3. Build answer strictly from retrieved content
  let answer = "";

  if (safety.isUnsafe) {
    answer =
      "Your question touches on an area that may be risky without personalized guidance. " +
      "Instead of intense or advanced poses, consider gentle yoga practices and breathing exercises. " +
      "Please consult a doctor or certified yoga therapist before attempting these poses.";
  } else {
    answer = retrievedArticles
      .map(article => article.content)
      .join(" ");
  }

  // 4. Log query (MongoDB-style logging)
  await QueryLog.create({
    query,
    retrievedChunks: retrievedArticles.map(a => ({
      id: a.id,
      title: a.title
    })),
    answer,
    isUnsafe: safety.isUnsafe,
    safetyReason: safety.reason,
    timestamp: new Date()
  });

  // 5. Return response
  res.json({
    answer,
    sources: retrievedArticles.map(
      a => `Article ${a.id}: ${a.title}`
    ),
    isUnsafe: safety.isUnsafe,
    warning: safety.reason || null,
    queryId: "demo-query-id"
  });
});

export default router;
