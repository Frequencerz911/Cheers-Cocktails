const AbstractManager = require("./AbstractManager");

class ContactManager extends AbstractManager {
  constructor() {
    super({ table: "contact" });
  }

  insert(contact) {
    return this.database.query(
      `insert into ${this.table} (email, object, message) values (?, ?, ?)`,
      [contact.email, contact.object, contact.message]
    );
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  update(contact) {
    return this.database.query(
      `update ${this.table} set is_read = ? where id = ?`,
      [contact.is_read, contact.id]
    );
  }
}

module.exports = ContactManager;
