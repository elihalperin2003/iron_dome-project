import express from "express";

import { createIncident, updateIncident } from "../services/functions.js";

const router = express.Router();

router.post("", async (req, res) => {
  await createIncident(req, res);
  await res.json({ message: "incident created!" });
});

router.patch("/:id/status", async (req, res) => {
  await updateIncident(req, res);
  await res.json({ message: "incident updated!" });
});

export default router;
