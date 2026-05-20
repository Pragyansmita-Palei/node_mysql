import mysqlpool from "../config/db.js"
import bcrypt from "bcrypt";

export const getUserService = async(userId)=>{
    const [rows] = await mysqlpool.query(
        "SELECT id,userName,email,phone,address,usertype FROM users WHERE id=? ",
        [userId]
    );
    return rows;
};

export const updateUserService = async(userId,userName,address,phone)=>{
    const [results] = await mysqlpool.query(
        `UPDATE users SET userName = COALESCE(?,userName),
                          address = COALESCE(?,address),
                          phone = COALESCE(?,phone)
                          WHERE id = ? `,[userName,JSON.stringify(address),phone,userId]      
    );
    return results;
}

export const resetPasswordService = async(email,newPassword,answer) =>{
    const [rows] = await mysqlpool.query(
        "SELECT * FROM users WHERE email =? AND answer= ?",[email,answer]
    );
    if(rows.length === 0) return null;

    //hashing password
   const saltRounds = 10;
   const hashedpassword = await bcrypt.hash(newPassword,saltRounds);

   await mysqlpool.query(
    "UPDATE users SET password =? WHERE email =?",
    [hashedpassword,email]
   );

        return true;

}

export const updatePasswordService = async(userId, oldPassword, newPassword) =>{
    const [rows] = await mysqlpool.query(
        "SELECT password FROM users WHERE id=?",[userId]
    );

     if (rows.length === 0) return { status: "not_found" };

  const isMatch = await bcrypt.compare(oldPassword, rows[0].password);

  if (!isMatch) return { status: "invalid_old_password" };

     //hashing password
    const saltRounds = 10;
const hashedpassword = await bcrypt.hash(newPassword,saltRounds)
 await mysqlpool.query(
    "UPDATE users SET password =? WHERE id =?",[hashedpassword,userId]
 );
   return { status: "success" };

}

export const deleteProfileService = async(userId)=>{
    const [result] = await mysqlpool.query(
        "DELETE FROM users WHERE id=?",[userId]
    );
    return result;
}