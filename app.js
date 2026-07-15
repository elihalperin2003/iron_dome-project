import express from "express";

import operatorRouter from "./routes/operatorRoute.js";
import incidentRoute from "./routes/incidentRoute.js";

const app = express();

app.route("/operators", operatorRouter);
app.route("/incidents", incidentRoute);
