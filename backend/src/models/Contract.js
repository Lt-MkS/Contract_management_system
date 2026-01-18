const { v4: uuidv4 } = require('uuid');
const pool = require('../config/database');

class Contract {
  static async create(blueprintId, title, status) {
    const id = uuidv4();
    const query = 'INSERT INTO contracts (id, blueprint_id, title, status) VALUES ($1, $2, $3, $4) RETURNING *';
    const result = await pool.query(query, [id, blueprintId, title, status]);
    return result.rows[0];
  }

  static async getAll() {
    const query = 'SELECT * FROM contracts';
    const result = await pool.query(query);
    return result.rows;
  }

  static async getById(id) {
    const query = 'SELECT * FROM contracts WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async updateStatus(id, status) {
    const query = 'UPDATE contracts SET status = $1 WHERE id = $2 RETURNING *';
    const result = await pool.query(query, [status, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM contracts WHERE id = $1';
    await pool.query(query, [id]);
  }
}

module.exports = Contract;
