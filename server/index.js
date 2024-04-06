const express=require("express");
const app=express();
const route=require("./routes/route");
require('dotenv').config();
const cors=require("cors");
app.use(cors());
app.use("/api",route);
app.listen(process.env.PORT);