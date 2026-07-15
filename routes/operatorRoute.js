import express from "express";

const router = express.Router();

router.post("", (req, res) => {
  const result = fun(req, res);
});

export default router;
