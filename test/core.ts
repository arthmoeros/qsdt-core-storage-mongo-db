process.env.QSDT_MONGO_STR = require('./own-db.json').connection;

const StorageManagerProvider = require('../src/storage-manager.provider').StorageManagerProvider;

const provider = new StorageManagerProvider();
const blueprintManager = provider.getBlueprintManager();
const formManager = provider.getFormManager();

async function wrapper() {
    try {
        let formsIndex = await formManager.getFormsIndex();
        for (let i = 0; i < formsIndex.length; i++) {
            console.log(formsIndex[i]);
            console.log(await formManager.getForm(formsIndex[i]));
        }

        let blueprint = await blueprintManager.getBlueprint('sample-arch-osb-gen', 'generate-sample-arch-osb');
        console.log(blueprint.getContents());

        let material = await blueprintManager.getBlueprintMaterial('sample-arch-osb-gen', './osb_project/project_file.atmpl');
        console.log(material);

        await provider.destroyProvider();
    } catch (error) {
        console.log(error);
    }
}

wrapper();