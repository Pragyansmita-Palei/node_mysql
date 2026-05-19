export const getUserController = async(req,res) =>{
    try{
res.status(200).send("user data")
    }catch(error){
        console.log(error)
       res.status(500).send({
        success:false,
        message:"error in get api",
        error
       })
    }
}