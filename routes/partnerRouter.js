const express = require('express');
const mongoose = require('mongoose');
const Partner = require('../models/partner');

const partnerRouter = express.Router();

partnerRouter.route('/')
    .get((req, res, next) => {
        Partner.find()
            .then(partners => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(partners);
            })
            .catch(err => next(err));
    })

    .post((req, res, next) => {
        Partner.create(req.body)
            .then(partner => {
                console.log('Partner created:', partner);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(partner);
            })
            .catch(err => next(err));
    })

    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /partners');
    })

    .delete((req, res) => {
        Partner.deleteMany()
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });

partnerRouter.route('/:partnerId')
    .get((req, res, next) => {
        Partner.findById(req.params.partnerId)
            .then(partner => {
                if (partner) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(partner);
                } else {
                    const err = new Error(`Partner ${req.params.partnerId} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch(err => next(err))
    })

    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /partners/${req.params.partnerId}`);
    })

    .put((req, res, next) => {
        Partner.findByIdAndUpdate(
            req.params.partnerId,
            { $set: req.body },
            { new: true }
        )
            .then(partner => {
                if (partner) {
                    console.log('Partner updated:', partner);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(partner);
                } else {
                    const err = new Error(`Partner ${req.params.partnerId} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch(err => next(err));
    })

    .delete((req, res, next) => {
        Partner.findByIdAndUpdate(req.params.partnerId)
            .then(partner => {
                if (partner) {
                    console.log('Partner deleted:', partner);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(partner);
                } else {
                    const err = new Error(`Partner ${req.params.partnerId} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch(err => next(err));
    });

module.exports = partnerRouter;