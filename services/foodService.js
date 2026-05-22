import mysqlpool from "../config/db.js";

export const createFoodSerice = async (data) => {
  const {
    title,
    description,
    price,
    imgUrl,
    foodTags,
    category,
    code,
    isAvailable,
    resturant,
    rating,
  } = data;

  const [result] = await mysqlpool.query(
    `INSERT INTO foods   ( title, description,price,imgUrl,foodTags,category,code,isAvailable, resturant_id, rating)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
      title,
      description,
      price,
      imgUrl,
      JSON.stringify(foodTags),
      category,
      code,
      isAvailable,
      resturant,
      rating,
    ]
  );
  return result;
};

//getall

export const getallFoodService = async() =>{
    const [rows] = await mysqlpool.query(
        "SELECT * FROM  foods "
    );
    return rows;
}

//get by id

export const getFoodByIdService = async(id) =>{
  const[rows] = await mysqlpool.query(
    "SELECT * FROM foods WHERE id =?",[id]
  );
  return rows[0]
};

//get by resturant id 

export const getFoodByResturantIdService = async(resturantId) =>{
 const [rows] = await mysqlpool.query(
  "SELECT * FROM foods WHERE resturant_id=?",[resturantId]
 );
 return rows;
};

//update
export const updateFoodService = async (id, data) => {
  const {
    title,
    description,
    price,
    imgUrl,
    foodTags,
    category,
    code,
    isAvailable,
    resturant_id,
    rating,
  } = data;

  const [result] = await mysqlpool.query(
    `UPDATE foods SET
      title = ?,
      description = ?,
      price = ?,
      imgUrl = ?,
      foodTags = ?,
      category = ?,
      code = ?,
      isAvailable = ?,
      resturant_id = ?,
      rating = ?
      
      WHERE id = ?`,
    [
      title,
      description,
      price,
      imgUrl,
      JSON.stringify(foodTags),
      category,
      code,
      isAvailable,
      resturant_id,
      rating,
      id,
    ]
  );

  return result;
};

//delete

export const deleteFoodService = async(id) =>{
  const [result] = await mysqlpool.query(
    "DELETE FROM foods WHERE id=?",[id]
  );
  return result;
};