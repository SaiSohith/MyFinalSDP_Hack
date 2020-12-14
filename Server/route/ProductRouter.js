const { response } = require('express');
const express=require('express');
const Review=require('../models/review');

const Product=require('../models/product');

const router=express.Router();

router.route('/products').get((req,res,next) => {
    Product.find({})
    .then((resp) => {
        if(resp.length==0)
        {
            const err=new Error({'message':'no details found'})
            throw err;
        }
        else
        {
            res.send(resp)
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.route('/addProduct').post((req,res,next) => {
    Product.create(req.body)
    .then((resp) => {
        res.send(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.route('/getproducts/:name').get((req,res,next) => {
    Product.find({name: req.params.name})
    .then((resp) => {
        if(resp.length==0)
        {
            const err=new Error('no details found')
            throw err;
        }
        else
        {
            res.send(resp)
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.route('/getprod/:id').get((req,res,next) => {
    Product.findById(req.params.id)
    .then((resp) => {
        if(resp.length==0)
        {
            const err=new Error('no details found')
            throw err;
        }
        else
        {
            res.send(resp)
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});



router.route('/update/:id').put((req,res,next) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
    .then((resp) => {
        res.send(resp);
    },(err) => next(err))
    .catch((err) => next(err));
});

router.route('/updateReview/:id').put((req,res,next) => {
    Review.create(req.body.Review)
    .then((resp) => {
        Product.findByIdAndUpdate(req.params.id, {
            $push: {Review: req.body.Review}
        }, { new: true })
        .then((resp) => {
            res.send(resp);
        },(err) => next(err))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});


router.route('/getReviews').get((req,res,next) => {
    Review.find({})
    .then((resp) => {
        res.send(resp);
    },(err) => next(err))
    .catch((err) => next(err));
});

module.exports=router;


