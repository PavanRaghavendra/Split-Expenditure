const express=require("express");
require('dotenv').config();
const User=require("../db/user.js");
const router=express.Router();
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const { route } = require("./Group.js");
const Authmiddle = require("../middleware/Authmiddle.js");
const userAuth = require("../middleware/userAuth.js");
//const { userAuth } = require("../middleware/userAuth.js");
router.use(express.json());
router.post("/createuser",async (req,res)=>
{
    try
    {
    const user= await User.findOne({userMail:req.body.userMail});
    if(user)
    {
      return  res.status(404).json(
            {
                msg:"Email Id already exisit please login"
            }
        )
    }
    const hashpassword=await bcrypt.hashSync(req.body.userPassword,10);
    req.body.userPassword=hashpassword;
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
                msg:"error try again"
            }
        )
    }
});
router.get("/getuser",async (req,res)=>
{
    try{
        const user=await User.findOne({userMail:req.query.userMail});
        if(user)
        {
            const password=await bcrypt.compareSync(req.query.userPassword,user.userPassword);
            if(password)
            {
                var token=await jwt.sign(user.userMail,process.env.JWT_SECRET);
               return res.status(200).json(
                    {
                        code:200,
                        msg:"valid password",
                        token:token,
                        user:
                        {
                            userMail:user.userMail,
                            userName:user.userName,
                            groups_invloved:user.groups_invloved
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
});
router.put("/updateuser",userAuth,async (req,res)=>
{
    try
    {
   const user= await User.findOneAndUpdate({userMail:req.userMail},req.body,{new:true,});
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
});
router.post("/addgroup",userAuth,async (req,res)=>
{
    try{
   const user= await User.findOne({userMail:req.userMail});
    const groups_invloveds=user.groups_invloved;
    groups_invloveds.push(req.body);
    //console.log(groups_invloveds);
  const response=  await User.findOneAndUpdate({userMail:req.userMail},{groups_invloved:groups_invloveds},{new:true});
  res.status(200).json(
    {
        msg:
        response?"updated successfully":"unsuccessfull"
    }
  )
  return;
}
    catch(err)
    {
        res.status(404).json(
            {
                msg:err
            }
        )
        return;
    }
});
router.get("/data",userAuth,async (req,res)=>
{
    try
    {
        //const user=await jwt.verify(token,secretkey);
        const person=await User.findOne({userMail:req.userMail});
        //console.log(person);
        res.status(200).json(
            {
                msg:person.userName
            }
        )
        return;
    }
catch(err)
{
    res.status(404).json(
        {
            msg:"error not found"
        }
    )
    return;
}
});
router.get("/getgroup", userAuth, async (req, res) => {
    try {
        const user = await User.findOne({ userMail: req.userMail });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const groups = user.groups_invloved.filter(value => value != null);
        return res.status(200).json({ msg: groups });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
router.post("/deleteGroup",userAuth,async (req,res)=>
{
    try{
        const user=await User.findOne({userMail:req.userMail});
        if(!user)
        {
            return res.status(404).json({ msg: "User not found" });
        }
        const index=req.body.index;
        const group=user.groups_invloved;
        for(let i=0;i<group.length;i++)
        {
            if(group[i].GroupId===index)
            {
               const user= group.splice(i,1);
                break;
            }
        }
      const user1=  await User.updateOne({userMail:req.userMail},{groups_invloved:group},{
            new:true
        })
        if(user1)
        {
            return res.status(200).json(
                {
                    msg:"updated"
                }
            )
        }
        else
        {
            return res.status(404).json(
                {
                    msg:"updates unsuccessfully"
                }
            )
        }
    }
    catch(err)
    {
        return res.status(404).json(
            {
                msg:err
            }
        )
    }
});
module.exports=router;