const AbstractManager = require("./AbstractManager");

class ContactManager extends AbstractManager {
  constructor() {
    super({ table: "contact" });
  }

  async create(contact) {
    const { email, object, message, is_read: IsRead } = contact;

    const [result] = await this.database.query(
      `insert into ${this.table} (email, object, message, is_read ) values (?, ?, ?, ?)`,
      [email, object, message, IsRead]
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

  async edit(id, contact) {
    const { email, object, message, is_read: IsRead } = contact;

    const [result] = await this.database.query(
      `UPDATE ${this.table} SET email = ?, object = ?, message = ?, is_read = ? WHERE id = ?`,
      [email, object, message, IsRead, id]
    );

    return result.affectedRows;
  }

  async delete(id) {
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = ContactManager;
