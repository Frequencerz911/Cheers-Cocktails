const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "comment" });
  }

  async create(comment) {
    const { content, recipe_id: recipeId, user_id: userId } = comment;

    const [result] = await this.database.query(
      `insert into ${this.table} (content, recipe_id, user_id) values (?, ?, ?)`,
      [content, recipeId, userId]
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

  async edit(id, comment) {
    const { content, recipe_id: recipeId, user_id: userId } = comment;

    const [result] = await this.database.query(
      `UPDATE ${this.table} SET content = ?, recipe_id = ?, user_id = ? WHERE id = ?`,
      [content, recipeId, userId, id]
    );

    return result.affectedRows;
  }

  async delete(id) {
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = CommentManager;
