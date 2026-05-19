import JWT from "jsonwebtoken"

export const authMiddleware = async(req,res,next)=>{
    try{
       //get token
        const token = req.headers["authorization"].split(" ")[1];
        JWT.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
                return res.status(401).send({
                    success:false,
                    message:"unauthorized user"
                });
            }else{
                req.user = decoded;
                next();
            }
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"please provide auth token",
            error
        })
    }
}