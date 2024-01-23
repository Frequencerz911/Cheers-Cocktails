const AbstractManager = require("./AbstractManager");

class QuantityManager extends AbstractManager {
  constructor() {
    super({ table: "quantity" });
  }

  async create(quantity) {
    const { value, type_id: typeId } = quantity;

    const [result] = await this.database.query(
      `insert into ${this.table} (value, type_id) values (?, ?)`,
      [value, typeId]
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

  async edit(id, quantity) {
    const { value, type_id: typeId } = quantity;

    const [result] = await this.database.query(
      `UPDATE ${this.table} SET value = ?, type_id = ? WHERE id = ?`,
      [value, typeId]
    );

    return result.affectedRows;
  }

  async delete(id) {
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = QuantityManager;
