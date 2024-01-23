const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "category" });
  }

  async create(categories) {
    const { name, is_alcool: IsAlcool } = categories;

    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, is_alcool) VALUES (?, ?)`,
      [name, IsAlcool]
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
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    return rows;
  }

  async edit(id, categories) {
    const { name, is_alcool: IsAlcool } = categories;

    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, is_alcool = ? WHERE id = ?`,
      [name, IsAlcool, id]
    );

    return result.affectedRows;
  }

  async delete(id) {
    await this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}

module.exports = CategoryManager;
