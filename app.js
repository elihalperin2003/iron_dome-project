import express from "express";

import operatorRouter from "./routes/operatorRoute.js";
import incidentRoute from "./routes/incidentRoute.js";

const app = express();

app.use(express.json());

app.use("/operators", operatorRouter);
app.use("/incidents", incidentRoute);

app.listen(process.env.PORT, () =>
  console.log(`listen to port ${process.env.PORT}`),
);
