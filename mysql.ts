const mysql2 = require('mysql2/promise');

const pool = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password:'lzy123!@#',
  database: 'juejin.xiaoce',
  charset:'utf8',
});

export default pool;
