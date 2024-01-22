const AbstractManager = require("./AbstractManager");

class IngredientManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "ingredient" as configuration
    super({ table: "ingredient" });
  }

  // The C of CRUD - Create operation
  async create(ingredient) {
    const { name } = ingredient;

    const [result] = await this.database.query(
      `insert into ${this.table} (name, ingredient_id) values (?, ?)`,
      [name]
    );

    // Return the ID of the newly inserted ingredient
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
    // Execute the SQL SELECT query to retrieve all ingredients from the "ingredient" table
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  // The U of CRUD - Update operation
  async edit(id, ingredient) {
    // Extract fields from the ingredient object
    const { name } = ingredient;

    // Execute the SQL UPDATE query to modify an existing ingredients in the "ingredient" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ? WHERE id = ?`,
      [name]
    );

    // Return the number of affected rows (0 if no ingredient was updated)
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to remove the ingredient with the specified ID
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = IngredientManager;
