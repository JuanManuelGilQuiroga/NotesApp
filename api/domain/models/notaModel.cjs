const ConnectToDatabase = require("../../infrastructure/db/mongodb.cjs")
const { ObjectId } = require('mongodb');

module.exports = class Nota {

    async findAll() {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('nota');
        const res = await collection.find().toArray();
        return res;
    }

    async findById (id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('nota');
        const [res] = await collection.find({_id: new ObjectId(id)}).toArray();
        return res;
    }

    async insert(userData) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('nota');
        const res = await collection.insertMany([userData]);
        return res;
    }

}