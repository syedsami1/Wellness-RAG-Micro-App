import express from "express";
import { safetyCheck } from "../safety/safetyCheck.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { query } = req.body;

  const safety = safetyCheck(query);

  // Mock RAG response (design-focused submission)
  const answer = safety.isUnsafe
    ? "This topic can be risky without personalized guidance. Consider gentle yoga practices and consult a certified professional."
    : "Yoga can improve flexibility, balance, and mental well-being when practiced regularly.";

  res.json({
    answer,
    sources: ["Article 1", "Article 6"],
    isUnsafe: safety.isUnsafe,
    warning: safety.reason || null,
    queryId: "demo-query-id"
  });
});

export default router;
