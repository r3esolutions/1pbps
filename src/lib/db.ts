
import mysql from "mysql2/promise";



const pool = mysql.createPool({

  host: "localhost",

  user: "newpbps",

  password: "10@Erdee04",

  database: "newpbps",

  waitForConnections: true,

  connectionLimit: 10

});



export default pool;

