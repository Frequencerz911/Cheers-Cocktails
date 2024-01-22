const AbstractManager = require("./AbstractManager");

class RecipeIngredientQuantityManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "recipeIngredientQuantity" as configuration
    super({ table: "recipe_ingredient_quantity" });
  }

  // The C of CRUD - Create operation
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

    // Return the ID of the newly inserted recipeIngredientQuantity
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
    // Execute the SQL SELECT query to retrieve all recipes_ingredients_quantities from the "recipeIngredientQuantity" table
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  // The U of CRUD - Update operation
  async edit(id, recipeIngredientQuantity) {
    // Extract fields from the recipeIngredientQuantity object
    const {
      recipe_id: recipeId,
      ingredient_id: ingredientId,
      quantity_id: quantityId,
    } = recipeIngredientQuantity;

    // Execute the SQL UPDATE query to modify an existing recipeIngredientQuantity in the "recipeIngredientQuantity" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET recipe_id = ?, ingredient_id = ?, quantity_id = ? WHERE id = ?`,
      [recipeId, ingredientId, quantityId, id]
    );

    // Return the number of affected rows (0 if no recipeIngredientQuantity was updated)
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to remove the recipeIngredientQuantity with the specified ID
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = RecipeIngredientQuantityManager;
