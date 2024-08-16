import { MongoClient, Db } from "mongodb";

let db: Db | null = null;

export const connectToDatabase = async (): Promise<void> => {
  try {
    const client = new MongoClient(
      process.env.MONGODB_URI || "mongodb://localhost:27017",
      {
        maxPoolSize: 10,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      }
    );

    await client.connect();
    db = client.db("picto360");
    console.log("Connected to database");
  } catch (error) {
    console.error("Failed to connect to the database", error);
    throw new Error("Database connection failed");
  }
};

export const getDb = (): Db => {
  if (!db) {
    throw new Error("Database not initialized. Call connectToDatabase first.");
  }
  return db;
};
