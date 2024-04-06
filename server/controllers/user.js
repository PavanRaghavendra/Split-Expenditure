const { response } = require("express");
const express=require("express");
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const User=require("../db/user.js");
const app=express();
app.use(express.json());
exports.createuser=async (req,res,next)=>
{
    try{
        const usermail=req.body.user_mail;
    const user= await User.findOne({user_mail:usermail});
    console.log(user);
    if(user)
    {
      return  res.status(404).json(
            {
                msg:"Email Id already exisit please login"
            }
        )
    }
    await User.create(req.body);
   return res.status(200).json(
        {
            msg:"User created successfully created"
        }
   )
}
catch(err)
{
    return res.status(404).json(
        {
            msg:"error has been occured"
        }
    )
}
}
exports.getuser=async (req,res)=>
{
    try{
    const user=await User.findOne();
    if(user)
    {
        if(user.user_password===req.body.user_password)
        {
           return res.status(200).json(
                {
                    msg:"valid password",
                    user:
                    {
                        user_Emailid:user.user_mail,
                        user_name:user.username,
                        groupsinvloved:user.groupsinvloved
                    }
                }
            )
        }
        else
        {
            return res.status(404).json(
                {
                    msg:"invalid password"
                }
            )
        }
    }
    else{
      return  res.status(404).json({
            msg:"user doesn't find in our database."
        })
    }
    }
    catch(err)
    {
      return  res.status(404).json(
            {
                msg:"error has been occured try again"
            }
        )
    }
}
exports.updateuser=async(req,res)=>
{
    try
    {
   const user= await User.findOneAndUpdate({user_Emailid:req.body.user_Emailid},req.body,{new:true,});
  return res.json(
    {
        msg:user?"user updated successfully":"Email doesn't find or something was wrong."
    }
   )
    }
    catch(err)
    {
       return res.status(404).json(
            {
                msg:err
            }
        )
    }

}
