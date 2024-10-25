const { MongoClient } = require("mongodb");

class ConnectToDatabase {
    static instanceConnect;
    db;
    connection;
    user;
    dbName;
    #password;

    constructor({ user, pwd, dbName } = { 
        user: process.env.MONGO_USER, 
        pwd: process.env.MONGO_PWD, 
        dbName: process.env.MONGO_DB
    }) {
        if (ConnectToDatabase.instanceConnect && this.connection) {
            return ConnectToDatabase.instanceConnect;
        }
        this.user = user;
        this.setPassword = pwd;
        this.db = dbName;
        ConnectToDatabase.instanceConnect = this;
    }

    async connectOpen() {
        this.connection = new MongoClient(`${process.env.MONGO_ACCESS}${this.user}:${this.getPassword}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${this.db}`);
        try {
            await this.connection.connect();
            this.db = this.connection.db(process.env.MONGO_DB);
        } catch (error) {
            this.connection = undefined;
            throw new Error('Error connecting');
        }
    }

    async connectClose() {
        await this.connection.close();
    }

    get getPassword() {
        return this.#password;
    }

    set setPassword(pwd) {
        this.#password = pwd;
    }
}

module.exports = ConnectToDatabase; 