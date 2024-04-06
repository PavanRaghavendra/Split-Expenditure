const express=require("express");
const app=express();
const user=require("./user");
const Group=require("./Group.js");
const trans=require("./transaction.js");
app.use("/user",user);
app.use("/group",Group);
app.use("/transaction",trans);
module.exports=app;