const AbstractManager = require("./AbstractManager");

class ContactManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "contact" as configuration
    super({ table: "contact" });
  }

  // The C of CRUD - Create operation
  async create(contact) {
    const { email, object, message, is_read: IsRead } = contact;

    const [result] = await this.database.query(
      `insert into ${this.table} (email, object, message, is_read ) values (?, ?, ?, ?)`,
      [email, object, message, IsRead]
    );

    // Return the ID of the newly inserted contact
    return result.insertId;
  }

  // The Rs of CRUD - Read operations
  async read(id, field) {
    // If the field parameter is specified, execute the SQL SELECT query
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

    // If the field parameter is not specified, execute the SQL SELECT query
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
    // Execute the SQL SELECT query to retrieve all contacts from the "contact" table
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  // The U of CRUD - Update operation
  async edit(id, contact) {
    // Extract fields from the contact object
    const { email, object, message, is_read: IsRead } = contact;

    // Execute the SQL UPDATE query to modify an existing contact in the "contact" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET email = ?, object = ?, message = ?, is_read = ? WHERE id = ?`,
      [email, object, message, IsRead, id]
    );

    // Return the number of affected rows (0 if no contact was updated)
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to remove the contact with the specified ID
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = ContactManager;
