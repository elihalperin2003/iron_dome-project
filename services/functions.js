import {
  operatorsBase,
  incidentsBase,
  logsBase,
} from "../repository/baseRepository.js";

export async function createOperator(req, res) {
  const { name, rank } = req.body;
  const insertId = await operatorsBase.insert({ name, rank });
  await logsBase.insert({
    action: "OPERATOR_CREATED",
    operator_id: insertId,
    description: "New operator created",
  });
  return;
}

export async function createIncident(req, res) {
  const { code_name, threat_level, operator_id } = req.body;
  const insertId = await incidentsBase.insert({
    code_name,
    threat_level,
    status: "OPEN",
    operator_id,
  });
  await logsBase.insert({
    action: "INCIDENT_CREATED",
    incident_id: insertId,
    operator_id: operator_id,
    description: "New incident created",
  });
  return;
}

export async function updateIncident(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  await incidentsBase.update({ status }, { id });
  const [incident] = await incidentsBase.select({ id });
  await logsBase.insert({
    action: "INCIDENT_UPDATED",
    incident_id: id,
    operator_id: incident.operator_id,
    description: "Incident updated",
  });
  return;
}

export async function getOpenIncidents(req, res) {
  const result = await incidentsBase.select({ status: "OPEN" });
  await logsBase.insert({
    action: "OPEN_INCIDENTS_SHOWED",
    description: "Show open incidents",
  });
  return result;
}
