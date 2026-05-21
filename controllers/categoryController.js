import { createCategoryService, deleteCategoryservice, getallCategoryService, getCategoryByIdService, updateCategoryService } from "../services/categoryService.js"

//create
export const createCategoryController = async (req,res)=>{
    try{
       const result = await createCategoryService(req.body);
       res.status(200).send({
        success:true,
        message:"category created successfully"
       })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in create category api"
        })
    }
};
//getall
export const getallCategoryController = async(req,res) =>{
    try{
       const categories  = await getallCategoryService();
       res.status(200).send({
        success:true,
        message:"category fetch successfully",
        totalcount:categories.length,
        data:categories
       })
    }catch(error){
        console.log(error)
        res.status(500).send({
            sucess:false,
            message:"error in get all category api",
        })
    }
};
//get by id

export const getCategoryByIdController = async(req,res) =>{
    try{
      const {id}= req.params;
       const category = await getCategoryByIdService(id);
       if(!category){
        return res.status(404).send({
            success:false,
            message:"category not found"
        });
       }
       res.status(200).send({
        success:true,
        message:"category fetched successfully",
        data:category
       })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in get by id category api"
        })
    }
};

//update 
export const updateCategoryController = async(req,res) =>{
    try{
       const {id} = req.params;
       const result = await updateCategoryService(id,req.body);
           if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Category updated successfully",
    });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in update category api"
        })
    }
}

//delete

export const deleteCategoryController = async(req,res) =>{
    try{
       const {id} = req.params;
       const result = await deleteCategoryservice(id);
       if(result.affectedRows ===0){
        return res.status(404).send({
            success:false,
            message:"category not found",
        });
       }
       res.status(200).send({
        success:true,
        message:"category deleted sucessfully"
       });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in delete catagory api"
        })
    }
}