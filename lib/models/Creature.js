const pool = require('../utils/pool');

module.exports = class Creature {
  id;
  title;
  species;
  lifespan;
  environment;
  img_url;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.species = row.species;
    this.lifespan = row.lifespan;
    this.environment = row.environment;
    this.img_url = row.img_url;
  }

  static async insert({ title, species, lifespan, environment, img_url }) {
    const { rows } = await pool.query(
      'INSERT INTO creatures (title, species, lifespan, environment, img_url) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
      [title, species, lifespan, environment, img_url]
    );
    return new Creature(rows[0]);
  } 
  

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM creatures'
    );
    return rows.map(row => new Creature(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM creatures WHERE id=$1;', [
      id,
    ]);
    
    if(!rows[0]) return null;
    return new Creature(rows[0]);
  }

  static async updateById(id, { title, species, lifespan, environment, img_url }) {
    const { rows } = await pool.query(
      'UPDATE creatures SET title = $1, species = $2 lifespan= $3 environment = $4 img_url = $5 WHERE id = $6 RETURNING *',
      [title, species, lifespan, environment, img_url, id]
    );
    return new Creature(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM creatures WHERE id = $1 RETURNING *;', [id]
    );
    if (!rows[0]) return null;
    return new Creature(rows[0]);
  }
};
