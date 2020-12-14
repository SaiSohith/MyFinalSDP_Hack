const mongoose1=require('mongoose');

const Cart=new mongoose.Schema({
    position: {
        type: String,
    },
    name: {
        type: String,
    },
    price: {
        type: Number,
    }
});

const user=new mongoose1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
   cart: [Cart],
   orderplaced: [Cart]
});

module.exports=mongoose1.model('User',user);