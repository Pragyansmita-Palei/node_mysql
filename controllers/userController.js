import { deleteProfileService, getUserService, resetPasswordService, updatePasswordService, updateUserService } from "../services/userService.js";

export const getUserController = async (req, res) => {
  try {
    //find user
    const user = await getUserService(req.user.id);
    //validation
    if (!user) {
      res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "user fetch successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get api",
      error,
    });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const { userName, address, phone } = req.body;

    const result = await updateUserService(
      req.user.id,
      userName,
      address,
      phone,
    );
      const user = {
      id: req.user.id,
      userName,
      phone,
      address,
    };
    if(result.affectedRows === 0){
        return res.status(404).send({
            success:false,
            message:"user not found"
        })
    }else{
        res.status(200).send({
            success:true,
            message:"user updated sucessfully",
            user
        })
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "update api not found",
    });
  }
};

export const resetPasswordController = async(req, res) =>{
try{
   const {email,newPassword,answer } = req.body;
   if(!email || !newPassword || !answer){
    return res.status(404).send({
        success:false,
        message:"please provide all fields",
    });
   }
   const result = await resetPasswordService(email,newPassword,answer);
     if(!result){
        return res.status(404).send({
            success:false,
            message:"user not found"
        });
     }
     
     res.status(200).send({
        success:false,
        message:"reset password sucessfully"
     });
}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error in password reset api"
    })
}
};

export const updatePasswordController = async(req,res) =>{
   try{
       const {oldPassword,newPassword} = req.body;
       const result = await updatePasswordService(
         req.user.id,
      oldPassword,
      newPassword
       );
       if (result.status === "not_found") {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    if (result.status === "invalid_old_password") {
      return res.status(400).send({
        success: false,
        message: "Invalid old password",
      });
    }
    res.status(200).send({
        success:true,
        message:"password update successfully"
    })
   }catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:"errorin updatepassword api"
    })
   }
};

export const deleteProfileController = async(req,res)=>{
try{
  const result = await deleteProfileService(req.params.id);
  if(result.affectedRows === 0){
    return res.status(404).send({
        success:false,
        message:"user not found",
    });
  }
  res.status(200).send({
    success:true,
    message:"your account has been deleted"
  })
}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error in delete account api"
    })
}
};