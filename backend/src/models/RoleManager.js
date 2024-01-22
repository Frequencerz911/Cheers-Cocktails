const AbstractManager = require("./AbstractManager");

class RoleManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "role" as configuration
    super({ table: "role" });
  }

  // The C of CRUD - Create operation
  async create(role) {
    const { name } = role;

    const [result] = await this.database.query(
      `insert into ${this.table} (name, role_id) values (?, ?)`,
      [name]
    );

    // Return the ID of the newly inserted role
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
    // Execute the SQL SELECT query to retrieve all roles from the "role" table
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  // The U of CRUD - Update operation
  async edit(id, role) {
    // Extract fields from the role object
    const { name } = role;

    // Execute the SQL UPDATE query to modify an existing roles in the "role" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ? WHERE id = ?`,
      [name]
    );

    // Return the number of affected rows (0 if no role was updated)
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to remove the role with the specified ID
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = RoleManager;
