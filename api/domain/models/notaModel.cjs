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

    async insert(noteData) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('nota');
        const res = await collection.insertMany([noteData]);
        return res;
    }

    async update(id, dataUpdate) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('nota');
        const res = await collection.updateOne(
            {_id: new ObjectId(id)},
            {$set: dataUpdate}
        );
        return res;
    }

    async delete(id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('nota');
        const res = await collection.deleteOne({
            _id: new ObjectId(id)
        });
        return res;
    }

}