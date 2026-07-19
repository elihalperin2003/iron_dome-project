import { incidentsBase, operatorsBase } from "../repository/baseRepository.js";

export const isIncidentExists = async (req, res, next) => {
  try {
    const id = req.params.id;
    const incident = await incidentsBase.select({ id });
    if (incident.length === 0) {
      const error = new Error();
      error.status = 404;
      error.message = "Incident ID not exists";
      return next(error);
    }
    return next();
  } catch (error) {
    next(error);
  }
};
export const isOperatorExists = async (req, res, next) => {
  try {
    const id = req.body.operator_id;
    const operator = await operatorsBase.select({ id });
    if (operator.length === 0) {
      const error = new Error();
      error.status = 404;
      error.message = "Operator ID not exists";
      return next(error);
    }
    return next();
  } catch (error) {
    next(error);
  }
};

export const isStatusCorrect = (req, res, next) => {
  const { status } = req.body;
  if (!["OPEN", "TRACKING", "INTERCEPTED", "CLOSED"].includes(status)) {
    const error = new Error();
    error.status = 400;
    error.message =
      "Status must be one of: OPEN, TRACKING, INTERCEPTED, CLOSED";
    return next(error);
  }
  return next();
};
