import pool from "../db/database.js";

function baseRepository(tableName) {
  async function select(filters) {
    const values = filters ? Object.values(filters) : "";
    const conditions = filters
      ? " where " +
        Object.keys(filters)
          .map((key) => `${key} = ?`)
          .join(" and ")
      : "";
    const [result] = await pool.execute(
      `SELECT * FROM ${tableName} ${conditions}`,
      values,
    );
    return result;
  }
  async function insert(newLine) {
    const values = Object.values(newLine);
    const keys = Object.keys(newLine)
      .map((key) => `\`${key}\``)
      .join(", ");
    const [result] = await pool.execute(
      `INSERT INTO ${tableName} (${keys}) VALUES (${values.map((_) => "?").join(",")})`,
      values,
    );
    return;
  }
  async function update(newData, filters) {
    const valuesFilters = filters ? Object.values(filters) : "";
    const conditions = filters
      ? " where " +
        Object.keys(filters)
          .map((key) => `${key} = ?`)
          .join(" and ")
      : "";
    const valuesData = Object.values(newData);
    const keysData = Object.keys(newData)
      .map((key) => `${key} = ?`)
      .join(", ");
    const [result] = await pool.execute(
      `UPDATE ${tableName} SET ${keysData} ${conditions}`,
      [...valuesData, ...valuesFilters],
    );
    return;
  }

  return { select, insert, update };
}

export const operatorsBase = baseRepository("operators");
export const incidentsBase = baseRepository("incidents");
