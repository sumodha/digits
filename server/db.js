import { MongoClient, ServerApiVersion }  from "mongodb";

const uri = 'mongodb+srv://sumo:test123@digits.ndytq.mongodb.net/digits?retryWrites=true&w=majority&appName=digits'
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

//module.exports = {connectDB, getCollection};