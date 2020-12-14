const express = require("express"),
         cors = require("cors"),
           bp = require("body-parser");
          app = express(),
      DB_NAME = "ECommerce",
         port = 9000,
         mongoose=require('mongoose');

app.use(bp.json());
app.use(express.json());
app.use(cors());
const uri='mongodb+srv://Sohith:Sohith@123@cluster0.dmena.mongodb.net/SDP?retryWrites=true&w=majority'

try {
    mongoose.connect( uri, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
    console.log("connected"));    
    }catch (error) { 
    console.log("could not connect");    
    }
const productroute=require('./route/ProductRouter');
const signin=require('./route/signinrouter');

app.use('/Users',signin);
app.use('/products',productroute);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});