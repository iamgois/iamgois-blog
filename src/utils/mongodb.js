import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = new MongoClient(process.env.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();

  return {
    db: client.db(process.env.dbName),
    client: client,
  };
}