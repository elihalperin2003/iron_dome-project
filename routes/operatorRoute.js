import express from "express";

import { createOperator } from "../services/functions.js";

const router = express.Router();

router.post("", async (req, res) => {
  await createOperator(req, res);
  await res.json({ message: "created!" });
});

export default router;
