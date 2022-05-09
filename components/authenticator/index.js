const { Router } = require('express');
const router = Router();
const authenticatorController = require('../authenticator/controller');

module.exports = (app) => {
    app.use('/', router);
    router.post('/new', ( req, res, next ) => {
        authenticatorController.insertUser( req, res, next );
    });

    router.post('/login', ( req, res, next ) => {
        authenticatorController.login( req, res, next );
    });
}