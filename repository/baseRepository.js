import pool from "../db/database.js";

function handleErrorSql(err) {
  console.error(err);
  const error = new Error();
  error.message =
    "Database connection failed or required parameters are missing.";
  error.status = 500;
  return error;
}

function baseRepository(tableName) {
  async function select(filters) {
    try {
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
    } catch (error) {
      throw handleErrorSql(error);
    }
  }
  async function insert(newLine) {
    try {
      const values = Object.values(newLine);
      const keys = Object.keys(newLine)
        .map((key) => `\`${key}\``)
        .join(", ");
      const [result] = await pool.execute(
        `INSERT INTO ${tableName} (${keys}) VALUES (${values.map((_) => "?").join(",")})`,
        values,
      );
      return result.insertId;
    } catch (error) {
      throw handleErrorSql(error);
    }
  }
  async function update(newData, filters) {
    try {
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
      return result;
    } catch (error) {
      throw handleErrorSql(error);
    }
  }

  return { select, insert, update };
}

export const operatorsBase = baseRepository("operators");
export const incidentsBase = baseRepository("incidents");
export const logsBase = baseRepository("logs");
