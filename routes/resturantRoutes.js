import express from "express"
import { authMiddleware } from "../middlewares/authMiddlware.js";
import { createRestaurantController, deleteResturantByIdController, getallResturantController, getResturantByIdController } from "../controllers/resturantController.js";

const router = express.Router();

//create resturant
router.post("/resturant",authMiddleware,createRestaurantController)
//getall resturant
router.get("/resturant",authMiddleware,getallResturantController)
//getbyid resturant
router.get("/resturant/:id",authMiddleware,getResturantByIdController)
//delete resturant
router.delete("/resturant/:id",authMiddleware,deleteResturantByIdController)
export default router;