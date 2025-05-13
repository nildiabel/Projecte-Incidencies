// src/mongo.js
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://a18hugcorcob:Holapedralbes_01@cluster0.yoo2cak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let collection;

async function connectMongo() {
  try {
    await client.connect();
    const db = client.db("logs");
    collection = db.collection("logs");
    console.log("✅ Conectado a MongoDB y colección 'logs' lista");
  } catch (err) {
    console.error("❌ Error al conectar a MongoDB:", err);
  }
}

function getMongoCollection() {
  return collection;
}

module.exports = { connectMongo, getMongoCollection };
