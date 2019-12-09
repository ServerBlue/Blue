'use strict';

const { Pool } = require('pg');

class Database {
  constructor(config) {
    this.pool = new Pool(config);
  }

  async query(sql, values = []) {
    console.log(`${sql} with parameters [${values.join(', ')}]`);
    try {
      const res = await this.pool.query(sql, values);
      return res.rows;
    } catch (err) {
      if (err) console.log(err.stack);
    }
  }

  close() {
    this.pool.end();
  }
}

module.exports = { Database };
