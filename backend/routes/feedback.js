import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  const { queryId, rating } = req.body;
  res.json({ status: "feedback received", queryId, rating });
});

export default router;
