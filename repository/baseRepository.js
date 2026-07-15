import pool from "./db/database.js";

function baseRepository(tableName) {
  async function select(filter) {
    const values = filter ? Object.values(filter) : "";
    const conditions = filter
      ? " where " +
        Object.keys(filter)
          .map((key) => `${key} = ?`)
          .join(",")
      : "";
    const [result] = await pool.execute(
      `SELECT * FROM ${tableName} ${conditions}`,
      values,
    );
    return result;
  }
  async function insert(newLine) {
    const values = Object.values(filter);
    const keys = Object.keys(filter).join(", ");
    const [result] = await pool.execute(
      `INSERT INTO ${tableName} (${keys}) VALUES (${values.map((_) => "?").join(",")})`,
      values,
    );
    return;
  }

  return { select };
}
