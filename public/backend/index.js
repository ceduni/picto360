// picto360-backend/index.js

const fastify = require('fastify')({ logger: true });
const { MongoClient } = require('mongodb');

// Connexion à MongoDB
const url = 'mongodb://localhost:27017';
const dbName = 'picto360';

const client = new MongoClient(url);

const start = async () => {
  try {
    await client.connect();
    fastify.mongo = client.db(dbName);

    fastify.get('/', async (request, reply) => {
      const collection = fastify.mongo.collection('images');
      const result = await collection.find().toArray();
      return result;
    });

    await fastify.listen(3000);
    fastify.log.info(`Server listening on http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
