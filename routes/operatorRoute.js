import express from "express";

import { createOperator } from "../services/functions.js";

const router = express.Router();

router.post("", async (req, res, next) => {
  try {
    await createOperator(req, res);
    await res.json({ message: "created!" });
  } catch (error) {
    next(error);
  }
});

export default router;
