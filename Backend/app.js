const express = require("express");
const cors = require("cors");
const connectToDb = require("./DB/db");
const authroutes=require('./routes/authRoutes');
const seoroutes=require('./routes/seoRoutes');


const app = express();


connectToDb(); 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/seo/auth/',authroutes);
app.use('/seo/meta/',seoroutes);

module.exports = app;
