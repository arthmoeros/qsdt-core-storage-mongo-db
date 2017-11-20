import { BlueprintManager, BlueprintContainer } from '@qsdt/common';
import * as mongo from 'mongodb';

import { mongoDBConnection } from './mongo-db-manager.config';
import { Db } from 'mongodb';

export class MongoDatabaseBlueprintManager extends BlueprintManager {
    
    private mongoDb: Promise<Db>;

    constructor(mongoDb: Promise<Db>){
        super();
        this.mongoDb = mongoDb;
    }

    public async getBlueprint(name: string, task: string): Promise<BlueprintContainer> {
        let db: Db = await this.mongoDb;
        let blueprint: any = await db.collection('blueprints').findOne({ name });
        if (blueprint) {
            return new BlueprintContainer(name, blueprint.contents.toString(), task);
        } else {
            return Promise.reject(new Error(`500 Couldn't find a blueprint record at database: ${name}:${task}`));
        }
    }

    public async getBlueprintMaterial(blueprintName: string, materialLocation: string): Promise<string> {
        let db: Db = await this.mongoDb;
        let material: any = await db.collection('blueprint-materials').findOne({ blueprintName, materialLocation });
        if (material) {
            return material.contents.toString();
        } else {
            return Promise.reject(new Error(`500 Couldn't find blueprint material record at database: ${blueprintName}:${materialLocation}`));
        }
    }
}