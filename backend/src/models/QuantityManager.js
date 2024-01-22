const AbstractManager = require("./AbstractManager");

class QuantityManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "quantity" as configuration
    super({ table: "quantity" });
  }

  // The C of CRUD - Create operation
  async create(quantity) {
    const { value, type_id: typeId } = quantity;

    const [result] = await this.database.query(
      `insert into ${this.table} (value, type_id) values (?, ?)`,
      [value, typeId]
    );

    // Return the ID of the newly inserted quantity
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
    // Execute the SQL SELECT query to retrieve all quantities from the "quantity" table
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  // The U of CRUD - Update operation
  async edit(id, quantity) {
    // Extract fields from the quantity object
    const { value, type_id: typeId } = quantity;

    // Execute the SQL UPDATE query to modify an existing quantity in the "quantity" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET value = ?, type_id = ? WHERE id = ?`,
      [value, typeId]
    );

    // Return the number of affected rows (0 if no quantity was updated)
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to remove the quantity with the specified ID
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = QuantityManager;
