const express=require("express");
const router=express.Router();
router.use(express.json());
const Transc=require('../db/transactions'); // Assuming Transc is your Mongoose model

router.post("/createTrans", async (req, res) => {
    try {
        const lastTransaction = await Transc.findOne().select("transactionId").sort({ transactionId: -1 });
        
        req.body.transactionId = lastTransaction ? lastTransaction.transactionId + 1 : 1;

        await Transc.create(req.body);

        return res.status(200).json({
            code: 200,
            message: "Transaction Created Successfully"
        });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes

        return res.status(500).json({  
            msg: "Internal Server Error"
        });
    }
});

router.get("/getalltransaction",async (req,res)=>
{
    try{
       // console.log(req.query.groupId);
    const transcations= await Transc.find({groupId:req.query.groupId})
    //console.log(transcations);
       return res.status(200).json(
            {
                message:
                Array.isArray(transcations) && transcations.length <= 0
                    ? "Either Group  id doesn't exist or no records found"
                    : "Transactions Fetched Successfully",
                data:transcations
            }
       )
    }
    catch(err)
    {
        return res.status(404).json({msg:"error has been faced"});
    }
});
router.get("/getTransaction",async (req,res)=>
{
    await Transc.find({ transactionId: req.query.transactionId })
    .then((docs) =>
        res.status(200).json({
            code: 200,
            message:
                Array.isArray(docs) && docs.length <= 0
                    ? "Either Group  id doesn't exist or no records found"
                    : "Transactions Fetched Successfully",

            data: docs,
        })
    )
    .catch((error) => res.json(error));
});
router.post("/updateTransaction",async (req,res)=>
{
    try{
  const response=  await Transc.findOneAndUpdate({transactionId:req.body.transactionId},req.body,{
        new:true,
    })
    console.log(response);
    if(response){
        res.status(200).json({
            code: 200,
            message: response
                ? "Comment updated successfully"
                : "Either Comment was not updated or commentId does not exist",
        });
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
router.post("/deleteTrans",async(req,res)=>
{
    try{
    const response=await Transc.collection.deleteMany({groupId:req.body.groupId});
    return res.status(200).json(
        {
            msg:response?"Compeleted successfully":"unsuccessfull"
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
    
})
module.exports=router;