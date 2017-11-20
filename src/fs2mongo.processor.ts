import * as mongo from 'mongodb';
import * as shelljs from 'shelljs';
import * as fs from 'fs';

import { mongoDBConnection } from './mongo-db-manager.config';
import { Db } from 'mongodb';

export class FS2MongoProcessor {

    private mongoDb: Promise<Db>;
    private dir: string;
    private db: Db;

    constructor(mongoDb: Promise<Db>, fsConfigDir: string) {
        this.mongoDb = mongoDb;
        this.dir = fsConfigDir;
    }

    public async runProcessors(){
        this.db = await this.mongoDb;
        await this.processBlueprints();
        await this.processBlueprintMaterials();
        await this.processForms();
        await this.db.close();
    }

    public async processBlueprints() {
        let files = shelljs.ls(this.dir + '/blueprint');
        for (let i = 0; i < files.length; i++) {
            if(files[i].lastIndexOf('.json') === -1){
                continue;
            }
            let filename = files[i].substr(0, files[i].lastIndexOf('.json'));
            let contents = fs.readFileSync(`${this.dir}/blueprint/${filename}.json`);
            await this.db.collection('blueprints').insertOne({
                name: filename,
                contents
            });
        }
    }

    public async processBlueprintMaterials() {
        let files = shelljs.ls('-R', this.dir + '/blueprint-material');
        for (let i = 0; i < files.length; i++) {
            let blueprint = files[i].substr(0,files[i].indexOf('/'));
            let location = '.'+files[i].substring(blueprint.length, files[i].length);
            if(fs.lstatSync(`${this.dir}/blueprint-material/${files[i]}`).isDirectory()){
                continue;
            }
            let contents = fs.readFileSync(`${this.dir}/blueprint-material/${files[i]}`);
            await this.db.collection('blueprint-materials').insertOne({
                blueprintName: blueprint,
                materialLocation: location,
                contents
            });
        }
    }

    public async processForms(){
        let files = shelljs.ls(this.dir + '/form');
        for (let i = 0; i < files.length; i++) {
            if(files[i].lastIndexOf('.json') === -1){
                continue;
            }
            let filename = files[i].substr(0, files[i].lastIndexOf('.json'));
            let contents = fs.readFileSync(`${this.dir}/form/${filename}.json`);
            await this.db.collection('forms').insertOne({
                name: filename,
                contents
            });
        }
    }

}