
const jwt=require("jsonwebtoken");
const user=require("../db/user");
require('dotenv').config();
const Authmiddle=(async (req,res,next)=>
{
    try{
    const token=req.headers.authorization;
    const user=await jwt.verify(token,process.env.JWT_SECRET);
    if(user)
    {
        req.useMail=user.useMail;
        next();
    }
    else
    {
        res.status(404).json(
            {
                msg:"verification has been falied"
            }
        )
    }
}catch(err)
{
    res.status(404).json(
        {
            msg:"Error has been occuered;"
        }
    )
}
});
module.exports=Authmiddle;