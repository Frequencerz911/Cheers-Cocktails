const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "user" });
  }

  // The C of CRUD - Create operation
  async create(user) {
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
    } = user;

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

    // Return the ID of the newly inserted user
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
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  // The U of CRUD - Update operation
  async edit(id, user) {
    // Extract fields from the user object
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
    } = user;

    // Execute the SQL UPDATE query to modify an existing user in the "user" table
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

    // Return the number of affected rows (0 if no user was updated)
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to remove the user with the specified ID
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = UserManager;
