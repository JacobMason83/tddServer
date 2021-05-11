import { MongoClient } from 'mongodb'

export const setDatabaseData = async (collectionName, data) => {
    const client = await MongoClient.connect(
      `mongodb://localhost:27017/TEST_DB`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    const db = client.db("TEST_DB");
    // testing
    await db.collection(collectionName).insertMany(data);
    client.close();
    
  };

export const getDatabaseData = async collectionName => {
       const client = await MongoClient.connect(
      `mongodb://localhost:27017/TEST_DB`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    const db = client.db("TEST_DB");
    // testing
    const result =await db.collection(collectionName).find().toArray();
    client.close();
    return result
}
export const restDatabase = async collectionName => {
    const client = await MongoClient.connect(
        `mongodb://localhost:27017/TEST_DB`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      const db = client.db("TEST_DB");
      // testing
      await db.dropDatabase()
      client.close();
      
}