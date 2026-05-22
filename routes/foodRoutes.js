import express, { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddlware.js";
import { createFoodController, deleteFoodController, getallFoodcontroller, getFoodByIdController, getFoodByResturantIdController, updateFoodController } from "../controllers/foodController.js";

const router = express.Router();
//create
router.post("/food",authMiddleware,createFoodController);
//getall
router.get("/food",authMiddleware,getallFoodcontroller);
//get by id
router.get("/food/:id",authMiddleware,getFoodByIdController);
//get by resturantid
router.get("/food/resturant/:resturantId",authMiddleware,getFoodByResturantIdController);

//update
router.put("/food/:id",authMiddleware,updateFoodController);

//delete
router.delete("/food/:id",authMiddleware,deleteFoodController)

export default router;