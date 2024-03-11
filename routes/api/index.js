import express from "express"
const router = express.Router();
import itemRoutes from "./api.items.routes.js"

router.use('/items', itemRoutes);

export default router;
