require('dotenv').config()
const mongoose=require("mongoose");
mongoose.connect(process.env.MONGO_URL);
const GroupScheme=new mongoose.Schema(
    {
        groupId:
        {
            type:Number,
            required:true,
            unique:true
        },
        groupName:
        {
            type:String,
            required:true
        },
        groupNumbers:
        {
            type:Array,
            required:true
        },
        createdDate: 
        {
            type: Date,
            default: Date.now,
        }
    }
)
const Group=mongoose.model("Group",GroupScheme);
module.exports=Group;