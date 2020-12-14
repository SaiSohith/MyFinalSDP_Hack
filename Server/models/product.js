const mongoose=require('mongoose');
const review = {
    Username:{
        type:String,
    },
    Review:{
        type:String,
    }
}
const Grossoryproduct=new mongoose.Schema({
    position: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    info:{
        type:String,
        required:true
    },
    price: {
        type: Number,
        required: true
    },
    Rating:{
        type:String,
        required: true
    },
    Review:[review]
});

module.exports=mongoose.model('Product',Grossoryproduct);