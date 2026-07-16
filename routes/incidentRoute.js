import express, { Router } from "express";

import {
  createIncident,
  updateIncident,
  getOpenIncidents,
} from "../services/functions.js";

const router = express.Router();

router.post("", async (req, res) => {
  await createIncident(req, res);
  await res.json({ message: "incident created!" });
});

router.patch("/:id/status", async (req, res) => {
  await updateIncident(req, res);
  await res.json({ message: "incident updated!" });
});

router.get("/open", async (req, res) => {
  const result = await getOpenIncidents(req, res);
  await res.json({ message: result });
});

export default router;
