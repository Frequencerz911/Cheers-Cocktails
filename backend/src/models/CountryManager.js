const AbstractManager = require("./AbstractManager");

class CountryManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "country" as configuration
    super({ table: "country" });
  }

  // The C of CRUD - Create operation
  async create(country) {
    const { name } = country;

    const [result] = await this.database.query(
      `insert into ${this.table} (name, country_id) values (?, ?)`,
      [name]
    );

    // Return the ID of the newly inserted country
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
    // Execute the SQL SELECT query to retrieve all countries from the "country" table
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  // The U of CRUD - Update operation
  async edit(id, country) {
    // Extract fields from the country object
    const { name } = country;

    // Execute the SQL UPDATE query to modify an existing countries in the "country" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ? WHERE id = ?`,
      [name]
    );

    // Return the number of affected rows (0 if no country was updated)
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to remove the country with the specified ID
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = CountryManager;
