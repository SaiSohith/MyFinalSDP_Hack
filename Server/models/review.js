const mongoose=require('mongoose');

const Review=new mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    Review: {
        type: String,
        required: true
    }
});

module.exports=mongoose.model('review',Review);