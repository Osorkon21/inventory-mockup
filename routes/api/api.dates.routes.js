import express from "express"
const router = express.Router();
import { Date } from "../../models/index.js"

// create new Date
router.post("/", async (req, res) => {
  try {
    const result = await Date.create(req.body);

    res.json({ status: "success", result });
  }
  catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "error", result: err.message });
  }
});

export default router;
