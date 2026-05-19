import mysqlpool from "../config/db.js";

export const findUserByEmail = async (email) => {
  const [rows] = await mysqlpool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  return rows[0];
};

export const createUserService = async (
  userName,
  email,
  hashedPassword,
  address,
  phone,
  usertype,
  answer,
) => {
  const [result] = await mysqlpool.query(
    `INSERT INTO users 
    (userName,email,password,address,phone,usertype,answer)
    VALUES (?,?,?,?,?,?,?)`,
    [userName, email, hashedPassword, JSON.stringify(address), phone,usertype, answer],
  );

  return result;
};
