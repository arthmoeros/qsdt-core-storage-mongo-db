import { FormManager } from '@qsdt/common';
import * as mongo from 'mongodb';

import { mongoDBConnection } from './mongo-db-manager.config';
import { Db, Cursor } from 'mongodb';

export class MongoDatabaseFormManager extends FormManager {
    
    private mongoDb: Promise<Db>;

    constructor(mongoDb: Promise<Db>){
        super();
        this.mongoDb = mongoDb;
    }

    public async getFormsIndex(): Promise<string[]> {
        let db: Db = await this.mongoDb;
        let cursor: Cursor<any> = await db.collection('forms').find();
        let forms: string[] = [];
        let form: any;
        while ((form = await cursor.next()) != null) {
            forms.push(form.name);
        }
        return forms;
    }

    public async getForm(name: string): Promise<string> {
        if (/[/\\]/.test(name)) {
            return Promise.reject(new Error("400 ID is invalid"));
        }
        let db: Db = await this.mongoDb;
        let form: any = await db.collection('forms').findOne({ name });
        if (form) {
            return form.contents.toString();
        } else {
            return Promise.reject(new Error("404 Form Configuration does not exist"));
        }
    }

}