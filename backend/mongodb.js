// const { MongoClient } = require('mongodb');

// const uri = "mongodb+srv://sarath:mongodb@sarath.pwemxqm.mongodb.net/?retryWrites=true&w=majority";
// const dbName = 'foodonfarm';
// let db = null;  // Initialize `db` as null to check later

// async function mongoconnec() {
//   if (db) {
//     console.log(" Using existing MongoDB connection.");
//     return;
//   }

//   try {
//     console.log(" Connecting to MongoDB...");
//     const client = new MongoClient(uri);

//     await client.connect(); // Establish MongoDB connection
//     db = client.db(dbName); // Assign the connected database

//     console.log(" Connected to MongoDB successfully!");
//   } catch (err) {
//     console.error(" MongoDB Connection Failed:", err);
//     throw err;  // Ensure the error is properly propagated
//   }
// }

// function getDB() {
//   if (!db) {
//     console.error(" MongoDB database is not initialized!");
//     throw new Error("MongoDB connection is not available.");
//   }
//   return db;
// }

// module.exports = { mongoconnec, getDB };


const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://sarath:mongodb@sarath.pwemxqm.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'foodonfarm';
let db = null;  // Database variable to store the DB instance
let client = null;  // MongoClient variable to store the client instance

// Function to establish the MongoDB connection
async function mongoconnec() {
  if (client) {
    console.log("MongoDB connection already established.");
    return; // If the connection already exists, skip the connection attempt
  }

  try {
    console.log("Connecting to MongoDB...");
    client = new MongoClient(uri);
    await client.connect(); // Establish the connection
    db = client.db(dbName); // Get the DB instance
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("MongoDB Connection Failed:", err);
    throw err; // Propagate the error to prevent further execution
  }
}

// Function to get the DB instance
function getDB() {
  if (!db) {
    console.error("MongoDB database is not initialized!");
    throw new Error("MongoDB connection is not available.");
  }
  return db; // Return the DB instance for queries
}

module.exports = { mongoconnec, getDB };

