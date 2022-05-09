let authenticatorService = require('../service');

class AuthenticatorController {

    async insertUser(req, res, next) {
        let data = req.body;
        let response = await authenticatorService.insertUser(data);
        res.json(response);
    }

    async login(req, res, next) {
        let username = req.body.username;
        let password = req.body.password;
        let response = await authenticatorService.login(username, password);
        res.json(response);
    }

}

module.exports = new AuthenticatorController();