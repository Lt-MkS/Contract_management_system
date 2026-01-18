const { v4: uuidv4 } = require('uuid');
const pool = require('../config/database');

class Blueprint {
  static async create(name, description, terms) {
    const id = uuidv4();
    const query = 'INSERT INTO blueprints (id, name, description, terms) VALUES ($1, $2, $3, $4) RETURNING *';
    const result = await pool.query(query, [id, name, description, JSON.stringify(terms)]);
    return result.rows[0];
  }

  static async getAll() {
    const query = 'SELECT * FROM blueprints';
    const result = await pool.query(query);
    return result.rows;
  }

  static async getById(id) {
    const query = 'SELECT * FROM blueprints WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async update(id, name, description, terms) {
    const query = 'UPDATE blueprints SET name = $1, description = $2, terms = $3 WHERE id = $4 RETURNING *';
    const result = await pool.query(query, [name, description, JSON.stringify(terms), id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM blueprints WHERE id = $1';
    await pool.query(query, [id]);
  }
}

module.exports = Blueprint;
