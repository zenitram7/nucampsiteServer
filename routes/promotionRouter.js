const express = require('express');
const Promotion = require('../models/promotion');
const { response } = require('../app');

const promotionRouter = express.Router();

promotionRouter.route('/')
    .get((req, res, next) => {
        Promotion.find()
            .then(promotions => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotions);
            })
            .catch(err => next(err));
    })

    .post((req, res, next) => {
        Promotion.create(req.body)
            .then(promotion => {
                console.log('Promotion created', promotion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            })
            .catch(err => next(err))
    })

    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT opertation not supported on /promotions')
    })

    .delete((req, res, next) => {
        Promotion.deleteMany()
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    })

promotionRouter.route('/:promotionId')
    .get((req, res, next) => {
        Promotion.findById(req.params.promotionId)
            .then(promotion => {
                if (promotion) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(promotion);
                } else {
                    const err = new Error(`Promotion ${req.params.promotionId} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch(err => next(err));
    })

    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
    })

    .put((req, res, next) => {
        Promotion.findByIdAndUpdate(
            req.params.promotionId,
            { $set: req.body },
            { new: true }
        )
            .then(promotion => {
                if (promotion) {
                    console.log('Promotion updated:', promotion);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(promotion);
                } else {
                    const err = new Error(`Promotion ${req.params.promotionId} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch(err => next(err));
    })

    .delete((req, res, next) => {
        Promotion.findByIdAndDelete(req.params.promotionId)
            .then(response => {
                if (response) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(response);
                } else {
                    const err = new Error(`Promotion ${req.params.promotionId} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch(err => next(err));
    });

module.exports = promotionRouter; 