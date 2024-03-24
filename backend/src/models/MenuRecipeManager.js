const AbstractManager = require("./AbstractManager");

class MenuRecipeManager extends AbstractManager {
  constructor() {
    super({ table: "menu_recipe " });
  }

  async create(menuRecipe) {
    const { menu_id: menuId, recipe_id: recipeId } = menuRecipe;

    const [result] = await this.database.query(
      `insert into ${this.table} (menu_id, recipe_id) values (?, ?)`,
      [menuId, recipeId]
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

  async edit(id, menuRecipe) {
    const { menu_id: menuId, recipe_id: recipeId } = menuRecipe;

    const [result] = await this.database.query(
      `UPDATE ${this.table} SET menu_id = ?, recipe_id = ? WHERE id = ?`,
      [menuId, recipeId, id]
    );

    return result.affectedRows;
  }

  async delete(id) {
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = MenuRecipeManager;
