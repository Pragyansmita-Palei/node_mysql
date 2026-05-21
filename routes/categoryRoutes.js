import express from "express"
import { authMiddleware } from "../middlewares/authMiddlware.js";
import { createCategoryController, deleteCategoryController, getallCategoryController, getCategoryByIdController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router();

//create 
router.post("/category",authMiddleware,createCategoryController)
//getall
router.get("/category",authMiddleware,getallCategoryController)
//get by id 
router.get("/category/:id",authMiddleware,getCategoryByIdController)
//update
router.put("/category/:id",authMiddleware,updateCategoryController)
//delete
router.delete("/category/:id",authMiddleware,deleteCategoryController)

export default router;