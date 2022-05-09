const { Router } = require('express');
const router = Router();
const Authenticator = require('../components/authenticator');

module.exports = (app) => {
    app.use('/', router);
    Authenticator(router);
}