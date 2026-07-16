import { operatorsBase, incidentsBase } from "../repository/baseRepository.js";

export async function createOperator(req, res) {
  const { name, rank } = req.body;
  await operatorsBase.insert({ name, rank });
  return;
}

export async function createIncident(req, res) {
  const { code_name, threat_level, operator_id } = req.body;
  await incidentsBase.insert({
    code_name,
    threat_level,
    status: "OPEN",
    operator_id,
  });
  return;
}

export async function updateIncident(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  await incidentsBase.update({ status }, { id });
}
