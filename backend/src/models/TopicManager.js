const AbstractManager = require("./AbstractManager");

class TopicManager extends AbstractManager {
  constructor() {
    super({ table: "topic" });
  }

  async create(topic) {
    const { name } = topic;

    const [result] = await this.database.query(
      `insert into ${this.table} (name, topic_id) values (?, ?)`,
      [name]
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

  async edit(id, topic) {
    const { name } = topic;

    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ? WHERE id = ?`,
      [name]
    );

    return result.affectedRows;
  }

  async delete(id) {
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = TopicManager;
