const AbstractManager = require("./AbstractManager");

class TypeManager extends AbstractManager {
  constructor() {
    super({ table: "type" });
  }

  async create(type) {
    const { type_name: typeName, unit } = type;

    const [result] = await this.database.query(
      `insert into ${this.table} (type_name, unit, role_id) values (?, ?, ?)`,
      [typeName, unit]
    );

    return result.insertId;
  }

  async read(id, field) {
    if (field) {
      const [rows] = await this.database.query(
        `SELECT ?? FROM ${this.table} WHERE id = ?`,
        [field, id]
      );

      if (rows.length === 0) {
        return null;
      }

      return rows[0][field];
    }

    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  async edit(id, type) {
    const { type_name: typeName, unit } = type;

    const [result] = await this.database.query(
      `UPDATE ${this.table} SET type_name = ?, unit = ? WHERE id = ?`,
      [typeName, unit, id]
    );

    return result.affectedRows;
  }

  async delete(id) {
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = TypeManager;
