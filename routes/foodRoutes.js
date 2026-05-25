import express, { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddlware.js";
import { createFoodController, deleteFoodController, getallFoodcontroller, getFoodByIdController, getFoodByResturantIdController, orderStatusController, placeOrderController, updateFoodController } from "../controllers/foodController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

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
router.delete("/food/:id",authMiddleware,deleteFoodController);
//place order
router.post("/placeorder",authMiddleware,placeOrderController);
//order status
router.post("/orderstatus/:id",authMiddleware,adminMiddleware,orderStatusController);
export default router;