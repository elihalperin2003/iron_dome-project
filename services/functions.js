import { operatorsBase } from "../repository/baseRepository.js";

export async function createOperator(req, res) {
  console.log(req.body);
  const { name, rank } = req.body;
  await operatorsBase.insert({ name, rank });
  return;
}
