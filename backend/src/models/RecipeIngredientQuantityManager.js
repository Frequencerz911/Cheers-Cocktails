const AbstractManager = require("./AbstractManager");

class RecipeIngredientQuantityManager extends AbstractManager {
  constructor() {
    super({ table: "recipe_ingredient_quantity" });
  }

  async create(recipeIngredientQuantity) {
    const {
      recipe_id: recipeId,
      ingredient_id: ingredientId,
      quantity_id: quantityId,
    } = recipeIngredientQuantity;

    const [result] = await this.database.query(
      `insert into ${this.table} (recipe_id, ingredient_id, quantity_id) values (?, ?, ?)`,
      [recipeId, ingredientId, quantityId]
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

  async edit(id, recipeIngredientQuantity) {
    const {
      recipe_id: recipeId,
      ingredient_id: ingredientId,
      quantity_id: quantityId,
    } = recipeIngredientQuantity;

    const [result] = await this.database.query(
      `UPDATE ${this.table} SET recipe_id = ?, ingredient_id = ?, quantity_id = ? WHERE id = ?`,
      [recipeId, ingredientId, quantityId, id]
    );

    return result.affectedRows;
  }

  async delete(id) {
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = RecipeIngredientQuantityManager;
