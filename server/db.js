import { MongoClient, ServerApiVersion }  from "mongodb";
// Load dotenv with import
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.mongodbURI // your mongodb uri here...

let collection;
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
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    collection = await client.db("digits").collection("targets");
  } catch {
    console.log("Server 404 Error");
  }
}

export function getCollection() {
    return collection;
}
