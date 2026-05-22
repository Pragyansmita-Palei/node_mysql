import { createFoodSerice, deleteFoodService, getallFoodService, getFoodByIdService, getFoodByResturantIdService, updateFoodService } from "../services/foodService.js"

//create
export const createFoodController = async(req,res)=>{
try{
  const result = await createFoodSerice(req.body);
  res.status(201).send({
    success:false,
    message:"food created successfully",
    data:result
  })
}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error in create food api"
    })
}
};

//getall
export const getallFoodcontroller = async(req,res) =>{
    try{
        const foods = await getallFoodService();
        res.status(200).send({
            success:true,
            totalCount:foods.length,
            message:"all foods fetch successfully",
            data:foods,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in get food api"
        })
    }
}

//getbyid

export const getFoodByIdController = async(req,res) =>{
    try{
       const {id} = req.params;
       const food = await getFoodByIdService(id);
       if(!food){
        return res.status(404).send({
            success:false,
            message:"food not found",
        });
       }
       res.status(200).send({
        success:true,
        message:"food fetched successfully",
        data:food
       });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in get by id food"
        })
    }
}

//getby resturant

export const getFoodByResturantIdController = async(req,res) =>{
    try{
        const {resturantId } = req.params;

        const foods = await getFoodByResturantIdService(resturantId );

        res.status(200).send({
            success:true,
            message:"food fetched by resturant id successfully",
            data:foods,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in get by resturant id food api"
        })
    }
}

// UPDATE FOOD
export const updateFoodController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await updateFoodService(id, req.body);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Food updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in update food API",
      error: error.message,
    });
  }
};

//delete

export const deleteFoodController = async(req,res) =>{
    try{
      const {id} = req.params;
      const result = await deleteFoodService(id);
      if(result.affectedRows==0){
       return res.status(404).send({
        success:false,
        message:"food not found",
       });
      }
      res.status(200).send({
        success:true,
        message:"food deleted sucessfully"
      })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in delete food api"
        })
    }
};