process.env.QSDT_MONGO_STR = require('./own-db.json').connection;

import { FS2MongoProcessor } from './../src/fs2mongo.processor';
import { mongoDBConnection } from './../src/mongo-db-manager.config';
import * as mongo from 'mongodb';

let processor = new FS2MongoProcessor(mongo.connect(mongoDBConnection), 'D:/qsdt/qsdt-core/config')

async function wrapper() {
    try {
        await processor.runProcessors();
    } catch (error) {
        console.log(error);
    }
}

wrapper();