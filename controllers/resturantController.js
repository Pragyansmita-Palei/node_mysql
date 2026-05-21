import { createResturantService, deleteRestaurantByIdService, getRestaurantByIdService, getResturantService } from "../services/resturantService.js";

// CREATE RESTAURANT
export const createRestaurantController = async(req,res)=>{
  try{
     const result = await createResturantService(req.body);
     res.status(201).send({
        success:true,
        message:"resturant created successfully",
        data:result,
     })
  }catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error in create resturant api"
    })
  }
};

// GET ALL RESTAURANTS
export const getallResturantController = async(req,res) =>{
    try{
         const resturants = await getResturantService();
         if(!resturants){
            return res.status(404).send({
                success:false,
                message:"resturant not available"
            })
         }
         res.status(200).send({
            success:true,
            message:"all resturant fetch successfully",
            totalCount: resturants.length,
            data:resturants,
         })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in get api",
            error
        })
    }
};

// GET RESTAURANT BY ID
export const getResturantByIdController  = async(req,res) =>{
    try{
      const {id} = req.params;
      const resturants = await getRestaurantByIdService(id);
      if(!resturants){
        return res.status(404).send({
            success:false,
            message:"resturant not found"
        });
      }

      res.status(200).send({
        success:true,
        message:"Restaurant fetched successfully",
        data:resturants,
      })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            messagee:"error in get by id api"
        })
    }
}

//delete restaurant 

export const deleteResturantByIdController = async(req,res) =>{
    try{
       const {id} = req.params;
       const result = await deleteRestaurantByIdService(id);
       if(result.affectedRows === 0){
        return res.status(404).send({
            success:false,
            message:"resturant not found",
        });
       }
       res.status(200).send({
        success:true,
        message:"resturant deleted sucessfully"
       })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in delete resturant api"
        })
    }
}