let mongoDbConnector = require('../../../db/mongo_db_connector');
const bcrypt = require("bcrypt");
const { ObjectId } = require('mongodb');
const { use } = require('bcrypt/promises');

class AuthenticatorService {

    async insertUser(data){   
        let response = await mongoDbConnector.get_only_usernames();
        for (let username of response) {
            if (username.username === data.username) {
                return false;
            }
        }
        let user = {
            username: data.username,
            password: bcrypt.hashSync(data.password, 10),
            data_credentials: data.data_credentials
        }
        await mongoDbConnector.insert(user);
        return true;
    }

    async login(username, password) {
        let users = await mongoDbConnector.getUserInfo(username);
        if (users.length === 0) {
            return false;
        }else{
            if (bcrypt.compareSync(password, users[0].password)) {
                return users[0].data_credentials
            }
            return false;
        }
    }
}

module.exports = new AuthenticatorService();