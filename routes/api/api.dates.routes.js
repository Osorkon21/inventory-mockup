import express from "express"
const router = express.Router();
import { Dates } from "../../models/index.js"

// create new Dates
router.post("/", async (req, res) => {
  try {
    const result = await Dates.create(req.body);

    res.json({ status: "success", result });
  }
  catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "error", result: err.message });
  }
});

export default router;
