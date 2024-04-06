const express=require("express");
const router=express.Router();
router.use(express.json());
const Group=require("../db/groups.js");
router.post("/creategroup",async(req,res)=>
{
    await Group.findOne()
    .select("groupId")
    .sort({ groupId: -1 })
    .then((lastgroupId) => {
      //console.log(lastgroupId);
      const lastGroupId = lastgroupId ? lastgroupId.groupId + 1 : 1;
      req.body.groupId = lastGroupId;
      return req;
    })
    .then((req) => {
      return Group.create(req.body);
    })
    .then((createdGroup) => {
      res.status(201).json({
        code: 200,
        message: "Group Created Successfully",
        groupId: createdGroup.groupId,
      });
    })
    .catch((error) =>  res.json(error));
});
router.get("/getallGroups",async (req,res)=>
{
    await Group.findOne()
    .then((groups)=>
    {
       return res.status(200).json(
            {
                code:200,
                msg:
                Array.isArray(groups)&&groups.length<=0? "Either group id doesn't exist or no records found":"fetched successfully",
                Groups:groups,
            }
        )
    })
    .catch((err)=>
    {
        return res.status(404).json(
            {
                msg:err,
            }
        )
    })
});
router.post("/getgroup",async (req,res)=>
{
    await Group.findOne({groupId:req.body.Id})
    .then((group)=>
    {
        res.status(200).json(
            {
                code:200,
                msg:
                Array.isArray(group)?"Either group id doesn't exist or no records found":"fetched successfully",
                Group:group,
            }
        )
    })
});
router.post("/delete",async (req,res)=>
{
    try{
   const response= await Group.findOneAndDelete({groupId:req.body.index});
   if(response)
   {
    return res.status(200).json(
        {
            msg:"success"
        }
    )
   }
   else
   {
       return res.status(404).json(
        {
            msg:"unsuccess"
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

})
module.exports=router;