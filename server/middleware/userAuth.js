const jwt=require('jsonwebtoken');
require('dotenv').config();
 const userAuth=async (req,res,next)=>
{
    const token=req.headers.authentication;
    if(token)
    {
        const user=await jwt.verify(token,process.env.JWT_SECRET);
        req.userMail=user;
        next();
    }
    else
    {
        res.status(404).json(
            {
                msg:'error has been occuered'
            }
        )
    }
};
module.exports=userAuth;