
const { MongoClient, ObjectId } = require('mongodb');
const { db } = require('../config/index');

class MongoDbConnector {
    constructor() {
        this.client = null;
        this.db = null;
        this.connect();
    }

    async connect() {
        let db_uri = `mongodb://${db.user}:${db.password}@${db.db_host}:${db.db_port}/${db.database_name}?authSource=${db.db_role}`;
        this.client = await MongoClient.connect(db_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        this.db = this.client.db(db.database);
    }

    async getUserInfo(username) {
        const collection = this.db.collection(db.collection_name);
        const result = await collection.find({ username }).toArray();
        return result;
    }

    async get_only_usernames() {
        const collection = this.db.collection(db.collection_name);
        const result = await collection.find({}, { projection: { username: 1, _id: 0 } }).toArray();
        return result;
    }


    async insert(data) {
        const collection = this.db.collection(db.collection_name);
        const result = await collection.insertOne(data);
        return result;
    }
}

module.exports = new MongoDbConnector();