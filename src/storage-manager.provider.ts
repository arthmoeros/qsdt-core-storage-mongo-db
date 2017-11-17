import { BlueprintManager, FormManager } from '@qsdt/common';
import * as mongo from 'mongodb';

import { MongoDatabaseBlueprintManager } from "./mongo-db-blueprint.manager";
import { MongoDatabaseFormManager } from "./mongo-db-form.manager"
import { mongoDBConnection } from './mongo-db-manager.config';
import { Db } from 'mongodb';

export class StorageManagerProvider {

    private mongoDb: Promise<Db>;

    constructor(){
        this.mongoDb = mongo.connect(mongoDBConnection);
    }

    public static getInstance(): StorageManagerProvider {
        return new StorageManagerProvider();
    }

    public getBlueprintManager(): BlueprintManager {
        return new MongoDatabaseBlueprintManager(this.mongoDb);
    }

    public getFormManager(): FormManager {
        return new MongoDatabaseFormManager(this.mongoDb);
    }

    public async destroy(){
        let db: Db = await this.mongoDb;
        db.close();
    }

}