const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

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

  async edit(id, user) {
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

    return result.affectedRows;
  }

  async delete(id) {
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = UserManager;
