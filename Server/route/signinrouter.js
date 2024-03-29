const express1 = require('express');

const User = require('../models/signin');
const jwt = require('jsonwebtoken');

const Srouter = express1.Router();

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject
    next()
}

Srouter.route('/allusers').get((req, res, next) => {
    User.find({})
        .then((resp) => {
            if (resp.length == 0) {
                const err = new Error({ 'message': 'no details found' })
                throw err;
            }
            else {
                res.send(resp)
            }
        }, (err) => next(err))
        .catch((err) => next(err));
});

Srouter.route('/addUser').post((req, res, next) => {
    User.create(req.body)
        .then((resp) => {
            let payload = { subject: resp._id };
            let token = jwt.sign(payload, 'secretkey')
            res.send({ token , resp});
        }, (err) => next(err))
        .catch((err) => next(err));
});

Srouter.route('/getUser/:email/:password').get((req, res, next) => {
    User.find({ email: req.params.email, password: req.params.password })
        .then((resp) => {
            if (resp.length == 0) {
                const err = new Error({ 'message': 'no details found' })
                throw err;
            }
            else {
                let payload = { subject: resp._id };
                let token = jwt.sign(payload, 'secretkey')
                res.send({ token , resp});
            }
        }, (err) => next(err))
        .catch((err) => next(err));
});

Srouter.route('/getUserById/:id').get((req, res, next) => {
    User.findById(req.params.id)
        .then((resp) => {
            if (resp.length == 0) {
                const err = new Error({ 'message': 'no details found' })
                throw err;
            }
            else {
                let payload = { subject: resp._id };
                let token = jwt.sign(payload, 'secretkey')
                res.send({ token , resp});
            }
        }, (err) => next(err))
        .catch((err) => next(err));
});

Srouter.route('/updateuser/:id').put((req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
        .then((resp) => {
            var nodemailer = require('nodemailer');

            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'noreply.zine@gmail.com',
                pass: 'sohith123'
              }
            });
            console.log(resp.email);
            var mailOptions = {
              from: 'noreply.zine@gmail.com',
              to:resp.email,
              subject: 'TEST APPLICATION',
              text: `HI,${resp.name},
               Your order of ${resp.orderplaced[0].name} has been successfully
               placed for the price of Rs.${resp.orderplaced[0].price}`
            };
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });

            let payload = { subject: resp._id };
            let token = jwt.sign(payload, 'secretkey')
            res.send({ token , resp});
        }, (err) => next(err))
        .catch((err) => next(err));
       
});

Srouter.route('/updatecart/:id').put((req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
        $push:{ cart: req.body.cart }
    }, { new: true })
        .then((resp) => {
            let payload = { subject: resp._id };
            let token = jwt.sign(payload, 'secretkey')
            res.send({ token , resp});
        }, (err) => next(err))
        .catch((err) => next(err));
});

Srouter.route('/updateorder/:id').put((req, res, next) => {
    console.log(req.params.id);
    User.findByIdAndUpdate(req.params.id, {
        $push:{ orderplaced: req.body.order}
    }, { new: true })
        .then((resp) => {
            let payload = { subject: resp._id };
            let token = jwt.sign(payload, 'secretkey')
            res.send({ token , resp});
        }, (err) => next(err))
        .catch((err) => next(err));
});

module.exports = Srouter;
