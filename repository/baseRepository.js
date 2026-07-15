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
    );
    return result;
  }

  return { select };
}
