const express = require('express');
const promotionRouter = express.Router();

promotionRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })

    .get((req, res, next) => {
        res.end('Will send all the promotions to you')
    })

    .post((req, res, next) => {
        res.end(`Will add the promotion: ${req.body.name} with description: ${req.body.description}`);
    })

    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT opertation not supported on /promotions')
    })

    .delete((req, res, next) => {
        res.end('Deleting all promotions');
    })

promotionRouter.route('/:promotionId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })

    .get((req, res, next) => {
        res.end(`Will send details of the promotion: ${req.params.promotionId} to you`);
    })

    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
    })

    .put((req, res, next) => {
        res.write(`Updating the promotion: ${req.params.promotionId}\n`)
        res.end(`Will update the promotion: ${req.body.name} with description: ${req.body.description}`);
    })

    .delete((req, res, next) => {
        res.end(`Deleting promotion: ${req, params.promotionId}`);
    })

module.exports = promotionRouter; 