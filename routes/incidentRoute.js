import express from "express";

import { createIncident } from "../services/functions.js";

const router = express.Router();

router.post("", async (req, res) => {
  await createIncident(req, res);
  await res.json({ message: "incident created!" });
});

export default router;
