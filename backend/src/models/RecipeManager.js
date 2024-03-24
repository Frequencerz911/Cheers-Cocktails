const AbstractManager = require("./AbstractManager");

class RecipeManager extends AbstractManager {
  constructor() {
    super({ table: "recipe" });
  }

  async create(recipe) {
    const {
      title,
      difficulty,
      preparation_time: preparationTime,
      is_shared: isShared,
      is_approved: isApproved,
      video,
      user_id: userId,
      category_id: categoryId,
      country_id: countryId,
    } = recipe;

    const [result] = await this.database.query(
      `insert into ${this.table} (title, difficulty, preparation_time, is_shared, is_approved, video, user_id, category_id, country_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        difficulty,
        preparationTime,
        isShared,
        isApproved,
        video,
        userId,
        categoryId,
        countryId,
      ]
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
    const [rows] = await this.database.query(
      `select recipe.id, title, difficulty, preparation_time, is_shared, is_approved, video, user_id, category_id, country_id, nickname from ${this.table} join user on user.id = recipe.user_id`
    );
    return rows;
  }

  async edit(id, recipe) {
    const {
      title,
      difficulty,
      preparation_time: preparationTime,
      is_shared: isShared,
      is_approved: isApproved,
      video,
      user_id: userId,
      category_id: categoryId,
      country_id: countryId,
    } = recipe;

    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title = ?, difficulty = ?, preparation_time = ?, is_shared = ?, is_approved = ?, video = ?, user_id = ?, category_id = ?, country_id = ? WHERE id = ?`,
      [
        title,
        difficulty,
        preparationTime,
        isShared,
        isApproved,
        video,
        userId,
        categoryId,
        countryId,
        id,
      ]
    );

    return result.affectedRows;
  }

  async delete(id) {
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = RecipeManager;
