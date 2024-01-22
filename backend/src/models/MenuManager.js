const AbstractManager = require("./AbstractManager");

class MenuManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "menu" as configuration
    super({ table: "menu" });
  }

  // The C of CRUD - Create operation
  async create(menu) {
    const {
      name,
      is_shared: isShared,
      is_approved: isApproved,
      topic_id: topicId,
    } = menu;

    const [result] = await this.database.query(
      `insert into ${this.table} (name, is_shared, is_approved, topic_id) values (?, ?, ?, ?)`,
      [name, isShared, isApproved, topicId]
    );

    // Return the ID of the newly inserted menu
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
    // Execute the SQL SELECT query to retrieve all menus from the "menu" table
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  // The U of CRUD - Update operation
  async edit(id, menu) {
    // Extract fields from the menu object
    const {
      name,
      is_shared: isShared,
      is_approved: isApproved,
      topic_id: topicId,
    } = menu;

    // Execute the SQL UPDATE query to modify an existing menu in the "menu" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, is_shared = ?, is_approved = ?, topic_id = ? WHERE id = ?`,
      [name, isShared, isApproved, topicId, id]
    );

    // Return the number of affected rows (0 if no menu was updated)
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to remove the menu with the specified ID
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = MenuManager;
