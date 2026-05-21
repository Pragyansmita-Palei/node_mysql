
import mysqlpool from "../config/db.js"

//create
export const createCategoryService = async(data)=>{
    const {title, imageUrl } = data;

    const [result] = await mysqlpool.query(
        ` INSERT INTO categories(title, imageUrl) VALUES (?, ?)`,[title, imageUrl]);
        return result;
};

//getall
export const getallCategoryService = async() =>{
    const [result] = await mysqlpool.query(
        "SELECT * FROM categories"
    );
    return result;
};
//get by id

export const getCategoryByIdService = async(id) =>{
   const [rows] = await mysqlpool.query(
    "SELECT * FROM categories WHERE id =?",[id]
   );
   return rows[0];
};
//update
export const updateCategoryService = async(id,data) =>{
     const { title, imageUrl } = data;
     const [result] = await mysqlpool.query(
         `UPDATE categories  SET title = ?, imageUrl = ? WHERE id = ?`,[title, imageUrl, id]
     );
   return result;
};

//delete
export const deleteCategoryservice = async(id) =>{
    const [result] = await mysqlpool.query(
        "DELETE FROM categories WHERE id=?",[id]
    );
    return result;
}