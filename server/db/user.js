require('dotenv').config()
const mongoose=require("mongoose");
mongoose.connect(process.env.MONGO_URL);
const userschema=new mongoose.Schema(
    {
        userName:
        {
            type:String,
            required:true,
        },
        userPassword:
        {
            type:String,
            required:true,
            min:8,
            max:15
        },
        userMail:
        {
            type:String,
            required:true,
            unique:true
        },
        groups_invloved:
        {
            type:Array
        },
        createdDate:
        {
            type:Date,
            default:Date.now
        }
    }
)
const user=mongoose.model("user",userschema);
module.exports=user;