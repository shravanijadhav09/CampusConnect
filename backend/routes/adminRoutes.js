import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { createEvent  ,   deleteEvent , updateEvent} from "../controllers/eventController.js";
import {
  getAllRegistrations,
} from "../controllers/registrationController.js";

const router = express.Router();

router.post(
  "/events",
  protect,
  adminOnly,
  createEvent
);

router.delete(
  "/events/:id",
  protect,
  adminOnly,
  deleteEvent
);

router.put(
  "/events/:id",
  protect,
  adminOnly,
  updateEvent
);

router.get(
  "/registrations",
  protect,
  adminOnly,
  getAllRegistrations
);

export default router;