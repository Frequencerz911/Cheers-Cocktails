const AbstractManager = require("./AbstractManager");

class MenuRecipeManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "menuRecipe" as configuration
    super({ table: "menu_recipe " });
  }

  // The C of CRUD - Create operation
  async create(menuRecipe) {
    const { menu_id: menuId, recipe_id: recipeId } = menuRecipe;

    const [result] = await this.database.query(
      `insert into ${this.table} (menu_id, recipe_id) values (?, ?)`,
      [menuId, recipeId]
    );

    // Return the ID of the newly inserted menuRecipe
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
    // Execute the SQL SELECT query to retrieve all menusRecipes from the "menuRecipe" table
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  // The U of CRUD - Update operation
  async edit(id, menuRecipe) {
    // Extract fields from the menuRecipe object
    const { menu_id: menuId, recipe_id: recipeId } = menuRecipe;

    // Execute the SQL UPDATE query to modify an existing menuRecipe in the "menuRecipe" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET menu_id = ?, recipe_id = ? WHERE id = ?`,
      [menuId, recipeId, id]
    );

    // Return the number of affected rows (0 if no menuRecipe was updated)
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to remove the menuRecipe with the specified ID
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = MenuRecipeManager;
