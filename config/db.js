import mysql2 from "mysql2"
import dotenv from "dotenv";

dotenv.config();

 const mysqlpool = mysql2.createPool({
     host: process.env.mysql_HOST,
     user: process.env.mysql_USER,
     database:process.env.mysql_DATABASE
}).promise();

export default mysqlpool;