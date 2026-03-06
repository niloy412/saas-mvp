import express from "express";
import {
  createPlan,
  getPlans,
  updatePlan,
  deletePlan,
  getPlanDetails
} from "./plan.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createPlan);
router.get("/", protect, getPlans);
router.get("/:id", protect, getPlanDetails);
router.put("/:id", protect, updatePlan);
router.delete("/:id", protect, deletePlan);

export default router;