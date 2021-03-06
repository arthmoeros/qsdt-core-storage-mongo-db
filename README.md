# ![qsdt-logo](https://raw.githubusercontent.com/arthmoeros/qsdt-ui/master/src/assets/img/rsz_qsdt-logo.png)@qsdt/core-storage-mongo-db
### Mongo DB Storage Implementation for QSDT's configuration

#### What's this? - Intro

This module contains the Mongo DB implementation of Form and Blueprints managing for QSDT.

#### What's in here?

##### MongoDatabaseFormManager

Defines how Forms are accessed via a stored collection at a Mongo Database

##### MongoDatabaseBlueprintManager

Defines how Blueprints and Blueprint Materials are accessed via a stored collection at a Mongo Database

##### FS2MongoProcessor

Migrates a FileSystem based configuration to a Mongo Database based one.

#### Anything else?

Be cautious of closing the Mongo DB connection using the *destroyProvider* method on the StorageManagerProvider class