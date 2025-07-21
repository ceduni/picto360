import { MongoClient, Db , ServerApiVersion} from "mongodb";
import mongoose from "mongoose";

let db: Db | null = null;

const connectToDatabase = async (): Promise<void> => {
  try {
    // const client = new MongoClient(
    //   process.env.MONGODB_URI || "mongodb://localhost:27017/picto360",
    //   {
    //     maxPoolSize: 10,
    //     connectTimeoutMS: 10000,
    //     socketTimeoutMS: 45000,
    //     serverApi: {
    //     version: ServerApiVersion.v1,
    //     strict: true,
    //     deprecationErrors: true,
    //   }
    //   }
    // );

    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/picto360",{
        serverSelectionTimeoutMS: 5000, // fast fail
    });
    // db = client.db("picto360");
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

export default connectToDatabase;
