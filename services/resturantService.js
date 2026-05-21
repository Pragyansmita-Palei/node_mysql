import mysqlpool from "../config/db.js";

export const createResturantService = async (data) => {
  const {
    title,
    imageUrl,
    foods,
    time,
    pickup,
    delivery,
    isopen,
    logoUrl,
    rating,
    ratingCount,
    code,
    coord_id,
    latitude,
    latitudeDelta,
    longitude,
    longitudeDelta,
    address,
    coord_title,
  } = data;
  const [result] = await mysqlpool.query(
    `INSERT INTO restaurants 
    (
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isopen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coord_id,
      latitude,
      latitudeDelta,
      longitude,
      longitudeDelta,
      address,
      coord_title
    )
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title,
      imageUrl,
      JSON.stringify(foods),
      time,
      pickup,
      delivery,
      isopen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coord_id,
      latitude,
      latitudeDelta,
      longitude,
      longitudeDelta,
      address,
      coord_title,
    ],
  );

  return result;
};

export const getResturantService = async() =>{
      const [rows] = await mysqlpool.query(
        "SELECT * FROM restaurants"
      );
      return rows;
};

export const getRestaurantByIdService = async(id) =>{
     const [rows] = await mysqlpool.query(
        "SELECT * FROM restaurants WHERE id=?",[id]
     );
     return rows;
};

export const deleteRestaurantByIdService = async(id)=>{
const [result] = await mysqlpool.query(
    "DELETE FROM restaurants WHERE id=?",[id]
);
return result;
}