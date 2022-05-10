let mongoDbConnector = require('../../../db/mongo_db_connector');
const bcrypt = require("bcrypt");

class AuthenticatorService {

    async insertUser(data){   
        let exists = await mongoDbConnector.usernameExists(data.username);
        if (exists) {
            return {
                status: false,
                message: 'Username already exists'
            };
        }
        let user = {
            username: data.username,
            password: bcrypt.hashSync(data.password, 10),
            data_credentials: data.data_credentials
        }
        await mongoDbConnector.insert(user);
        return {
            status: true,
            message: 'User created successfully'
        }
    }

    async login(username, password) {
        let users = await mongoDbConnector.getUserInfo(username);
        if (users.length === 0) {
            return {
                status: false,
                message: 'Username does not exist'
            }
        }else{
            if (bcrypt.compareSync(password, users[0].password)) {
                return users[0].data
            }
            return {
                status: false,
                message: 'Password is incorrect'
            };
        }
    }
}

module.exports = new AuthenticatorService();