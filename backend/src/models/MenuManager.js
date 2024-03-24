const AbstractManager = require("./AbstractManager");

class MenuManager extends AbstractManager {
  constructor() {
    super({ table: "menu" });
  }

  async create(menu) {
    const {
      name,
      is_shared: isShared,
      is_approved: isApproved,
      topic_id: topicId,
    } = menu;

    const [result] = await this.database.query(
      `insert into ${this.table} (name, is_shared, is_approved, topic_id) values (?, ?, ?, ?)`,
      [name, isShared, isApproved, topicId]
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

  async edit(id, menu) {
    const {
      name,
      is_shared: isShared,
      is_approved: isApproved,
      topic_id: topicId,
    } = menu;

    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, is_shared = ?, is_approved = ?, topic_id = ? WHERE id = ?`,
      [name, isShared, isApproved, topicId, id]
    );

    return result.affectedRows;
  }

  async delete(id) {
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = MenuManager;
