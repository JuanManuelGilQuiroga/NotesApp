const ConnectToDatabase = require("../../infrastructure/db/mongodb.cjs")
const { ObjectId } = require('mongodb');

module.exports = class Historial {

    async findAll() {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('historial');
        const res = await collection.find().toArray();
        return res;
    }

    async findById (id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('historial');
        const [res] = await collection.find({notaId: new ObjectId(id)}).toArray();
        return res;
    }

    async insert(noteData) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('historial');
        const res = await collection.insertMany([noteData]);
        return res;
    }

    async update(id, dataUpdate) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('historial');
        const res = await collection.updateOne(
            {notaId: new ObjectId(id)},
            {$push: { historial: dataUpdate }}
        );
        console.log( "res del modelo historial",res)
        return res;
    }

    async delete(id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('historial');
        const res = await collection.deleteOne({
            _id: new ObjectId(id)
        });
        return res;
    }

}