import express from "express"
const router = express.Router();
import itemRoutes from "./api.items.routes.js"
import orderRoutes from "./api.orders.routes.js"
import dateRoutes from "./api.dates.routes.js"

router.use('/items', itemRoutes);
router.use("/orders", orderRoutes);
router.use("/dates", dateRoutes);

export default router;
