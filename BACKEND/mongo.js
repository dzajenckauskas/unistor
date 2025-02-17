const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

let url;
if (process.env.production) {
    url = process.env.mongoProduction;
} else {
    url = process.env.mongoDEV;
}

const dbName = process.env.dbName;
export async function insertDocument(collection, data) {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    try {
        const inserted = await db
            .collection(collection)
            .insertOne(data);
        return inserted;
    } catch (error) {
        return error;
    } finally {
        client.close();
    }
}
export async function removeDocument(collection, data) {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    try {
        const inserted = await db
            .collection(collection)
            .deleteOne(data);
        return inserted;
    } catch (error) {
        return error;
    } finally {
        client.close();
    }
}
export async function getAllCollections() {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    try {
        const inserted = await db.listCollections().toArray();
        return inserted;
    } catch (error) {
        return error;
    } finally {
        client.close();
    }
}

export async function findOneDocument(collection, toFind) {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    try {
        const found = await db.collection(collection).findOne(toFind);
        return found;
    } catch (error) {
        return error;
    } finally {
        client.close();
    }
}
export async function findAllDocuments(collection, toFind) {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    try {
        const found = await db
            .collection(collection)
            .find(toFind)
            .toArray();
        return found;
    } catch (error) {
        return error;
    } finally {
        client.close();
    }
}

export async function findByID(collection, id) {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    try {
        const found = await db
            .collection(collection)
            .findOne({_id: ObjectId(`${id}`)});
        return found;
    } catch (error) {
        return error;
    } finally {
        client.close();
    }
}
export async function updateById(collection, id, value) {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    try {
        const found = await db
            .collection(collection)
            .updateOne({_id: ObjectId(`${id}`)}, {$set: value});
        return found;
    } catch (error) {
        return error;
    } finally {
        client.close();
    }
}
export async function updateOneDocument(collection, findBy, value) {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    try {
        const found = await db
            .collection(collection)

            .updateOne(findBy, {$set: value}, {upsert: false});
        return found;
    } catch (error) {
        return error;
    } finally {
        client.close();
    }
}
export async function updateOneEntry(collection, findBy, value) {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    try {
        const found = await db
            .collection(collection)
            .updateOne(findBy, {$set: value}, {upsert: true});
        return found;
    } catch (error) {
        return error;
    } finally {
        client.close();
    }
}
export async function updateObjectInsideArray(
    collection,
    findByObj,
    setToObj
) {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    try {
        const found = await db
            .collection(collection)
            .updateOne(findByObj, {$set: setToObj});
        return found;
    } catch (error) {
        return error;
    } finally {
        client.close();
    }
}
export async function removeObjectFromArray(
    collection,
    id,
    toRemove
) {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    try {
        const found = await db
            .collection(collection)
            .updateOne({_id: ObjectId(`${id}`)}, {$pull: toRemove});
        return found;
    } catch (error) {
        return error;
    } finally {
        client.close();
    }
}
export async function pushToArray(collection, id, toPush) {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    try {
        const found = await db
            .collection(collection)
            .updateOne({_id: ObjectId(`${id}`)}, {$push: toPush});
        return found;
    } catch (error) {
        return error;
    } finally {
        client.close();
    }
}
export async function pushToArrayIfNotExists(collection, id, toPush) {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    try {
        const found = await db
            .collection(collection)
            .updateOne(
                {_id: ObjectId(`${id}`)},
                {$addToSet: toPush},
                {upsert: true}
            );
        return found;
    } catch (error) {
        return error;
    } finally {
        client.close();
    }
}

export async function pushToArrayWithoutID(
    collection,
    search,
    toPush
) {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    try {
        const found = await db
            .collection(collection)
            .updateOne(search, {$push: toPush}, {upsert: true});
        return found;
    } catch (error) {
        return error;
    } finally {
        client.close();
    }
}

export async function changeNumberByX(collection, search, change) {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    try {
        const found = await db
            .collection(collection)
            .findOneAndUpdate(
                search,
                {$inc: change},
                {upsert: true, returnDocument: "after"}
            );
        return found;
    } catch (error) {
        return error;
    } finally {
        client.close();
    }
}
