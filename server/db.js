import { MongoClient, ServerApiVersion }  from "mongodb";

import dotenv from "dotenv";
dotenv.config();


const uri = process.env.MONGODB_URI // your mongodb uri here...

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);


export async function connectDB() {
  try {
    // Connect the client to the server 
    let result = await client.connect();
    let db = result.db("digits");
    console.log("Succesfully connected");
    return db.collection("targets");

  } catch {
    console.error("MongoDB connection failed:", err);
  }
}

