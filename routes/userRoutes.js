import express from 'express'
import { deleteProfileController, getUserController, resetPasswordController, updatePasswordController, updateUserController } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddlware.js';

const router = express.Router();

//get user
router.get("/get",authMiddleware,getUserController);
//update user
router.put("/update",authMiddleware,updateUserController);
//reset password
router.post("/resetpassword",authMiddleware,resetPasswordController);
// UPDATE PASSWORD
router.post("/updatepassword",authMiddleware,updatePasswordController);
//delete account
router.delete("/deleteUser/:id",authMiddleware,deleteProfileController);
export default router;