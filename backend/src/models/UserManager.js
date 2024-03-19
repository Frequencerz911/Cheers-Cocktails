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
      hashPassword,
      avatar,
      date_account_created: dateAccountCreated,
      role_id: roleId,
    } = user;

    const [result] = await this.database.query(
      `insert into ${this.table} (firstname, lastname, nickname, email, hash_password, avatar, date_account_created, role_id) values (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstname,
        lastname,
        nickname,
        email,
        hashPassword,
        avatar,
        dateAccountCreated,
        roleId,
        3,
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

  async readByEmail(email) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );

    return rows[0];
  }

  async edit(id, user) {
    const {
      firstname,
      lastname,
      nickname,
      email,
      hash_password: hashPassword,
      is_avatar: isAvatar,
      date_account_created: dateAccountCreated,
      role_id: roleId,
    } = user;

    const [result] = await this.database.query(
      `UPDATE ${this.table} SET firstname = ?, lastname = ?, nickname = ?, email = ?, hash_password = ?, is_avatar = ?, date_account_created = ?, role_id = ? WHERE id = ?`,
      [
        firstname,
        lastname,
        nickname,
        email,
        hashPassword,
        isAvatar,
        dateAccountCreated,
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
