const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "comment" as configuration
    super({ table: "comment" });
  }

  // The C of CRUD - Create operation
  async create(comment) {
    const { content, recipe_id: recipeId, user_id: userId } = comment;

    const [result] = await this.database.query(
      `insert into ${this.table} (content, recipe_id, user_id) values (?, ?, ?)`,
      [content, recipeId, userId]
    );

    // Return the ID of the newly inserted comment
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
    // Execute the SQL SELECT query to retrieve all comments from the "comment" table
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  // The U of CRUD - Update operation
  async edit(id, comment) {
    // Extract fields from the comment object
    const { content, recipe_id: recipeId, user_id: userId } = comment;

    // Execute the SQL UPDATE query to modify an existing comment in the "comment" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET content = ?, recipe_id = ?, user_id = ? WHERE id = ?`,
      [content, recipeId, userId, id]
    );

    // Return the number of affected rows (0 if no comment was updated)
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to remove the comment with the specified ID
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = CommentManager;
