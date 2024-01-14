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
      firstname,
      lastname,
      nickname,
      email,
      password,
      is_avatar: isAvatar,
      date_account_created: dateAccountCreated,
      last_connection: lastConnection,
      role_id: roleId,
    } = user;

    const [result] = await this.database.query(
      `insert into ${this.table} (firstname, lastname, nickname, email, password, is_avatar, date_account_created, last_connection, role_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstname,
        lastname,
        nickname,
        email,
        password,
        isAvatar,
        dateAccountCreated,
        lastConnection,
        roleId,
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
      firstname,
      lastname,
      nickname,
      email,
      password,
      is_avatar: isAvatar,
      date_account_created: dateAccountCreated,
      last_connection: lastConnection,
      role_id: roleId,
    } = user;

    // Execute the SQL UPDATE query to modify an existing user in the "user" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET firstname = ?, lastname = ?, nickname = ?, email = ?, password = ?, is_avatar = ?, date_account_created = ?, last_connection = ?, role_id = ? WHERE id = ?`,
      [
        firstname,
        lastname,
        nickname,
        email,
        password,
        isAvatar,
        dateAccountCreated,
        lastConnection,
        roleId,
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
