import express, { Router } from "express";

import {
  createIncident,
  updateIncident,
  getOpenIncidents,
} from "../services/functions.js";

import {
  isIncidentExists,
  isOperatorExists,
  isStatusCorrect,
} from "../middleware/middleware.js";

const router = express.Router();

router.post("", isOperatorExists, async (req, res, next) => {
  try {
    await createIncident(req, res);
    res.json({ message: "incident created!" });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:id/status",
  isIncidentExists,
  isStatusCorrect,
  async (req, res, next) => {
    try {
      await updateIncident(req, res);
      res.json({ message: "incident updated!" });
    } catch (error) {
      next(error);
    }
  },
);

router.get("/open", async (req, res, next) => {
  try {
    const result = await getOpenIncidents(req, res);
    res.json({ message: result });
  } catch (error) {
    next(error);
  }
});

export default router;
