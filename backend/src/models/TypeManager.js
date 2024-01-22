const AbstractManager = require("./AbstractManager");

class TypeManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "type" as configuration
    super({ table: "type" });
  }

  // The C of CRUD - Create operation
  async create(type) {
    const { type_name: typeName, unit } = type;

    const [result] = await this.database.query(
      `insert into ${this.table} (type_name, unit, role_id) values (?, ?, ?)`,
      [typeName, unit]
    );

    // Return the ID of the newly inserted type
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
    // Execute the SQL SELECT query to retrieve all types from the "type" table
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  // The U of CRUD - Update operation
  async edit(id, type) {
    // Extract fields from the type object
    const { type_name: typeName, unit } = type;

    // Execute the SQL UPDATE query to modify an existing type in the "type" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET type_name = ?, unit = ? WHERE id = ?`,
      [typeName, unit, id]
    );

    // Return the number of affected rows (0 if no type was updated)
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to remove the type with the specified ID
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = TypeManager;
