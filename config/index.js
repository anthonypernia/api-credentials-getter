const dotenv = require('dotenv').config();

let config = {
    port: process.env.PORT || 8080,
};

let db = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_role: process.env.DB_ROLE,
    database_name: process.env.DB_NAME,
    mongo_db_uri: process.env.MONGO_DB_URI,
    collection_name: process.env.COLLECTION_USERS_NAME,
}

module.exports = {
    config,
    db
}