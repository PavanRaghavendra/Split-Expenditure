require('dotenv').config()
const mongoose=require("mongoose");
mongoose.connect(process.env.MONGO_URL);
var transferscheme=new mongoose.Schema(
    {
        transactionId: {
            type: Number,
            required: true,
            unique: true,
        },
        groupId: {
            type: Number,
            required: true
        },
        transactionName: {
            type: String,
            required: true
        },
        initiatedBy: {
            type: Object,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        membersOfTransaction: {
            type: Array,
            required: true
        },
        createdDate: {
            type: Date,
            default: Date.now,
        },
        upiId: {
            type: String
        }
    }
)
const transaction=mongoose.model("transaction",transferscheme);
module.exports=transaction;