import express from "express";
import {
  createSubscription,
  getMySubscription,
  getSubscriptionById,
  upgradeSubscription,
  downgradeSubscription,
  cancelSubscription,
} from "./subscription.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createSubscription);
router.get("/", protect, getMySubscription);
router.get("/:id", protect, getSubscriptionById);
router.patch("/:id/upgrade", protect, upgradeSubscription);
router.patch("/:id/downgrade", protect, downgradeSubscription);
router.patch("/:id/cancel", protect, cancelSubscription);

export default router;