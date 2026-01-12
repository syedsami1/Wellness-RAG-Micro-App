import express from "express";
import cors from "cors";
import askRoute from "./routes/ask.js";
import feedbackRoute from "./routes/feedback.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/ask", askRoute);
app.use("/feedback", feedbackRoute);

app.listen(5000, () => {
  console.log("Wellness RAG Backend running on port 5000");
});
