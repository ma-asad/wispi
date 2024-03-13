import { MongoClient, ServerApiVersion } from "mongodb";
import express from "express";

const port = 3000;
const uri =
  "mongodb+srv://asad:LcKJMBT6krGoMnt0@wispi.sy0u7sr.mongodb.net/?retryWrites=true&w=majority&appName=Wispi";
const app = express();

app.use(express.static("./public"));

// app.post("/M00952726/user", async (req, res) => {
//   const user = {
//     name: req.body.name,
//     email: req.body.email,
//     studentID: req.body.studentID,
//   };
//   const database = client.db("Wispi");
//   const collection = database.collection("users");
//   try {
//     const result = await collection.insertOne(user);
//     res.status(201).json(result);
//   } catch (error) {
//     res.status(500).json({ message: "Error inserting user" });
//   }
// });

// app.get("/M00952726/users", async (req, res) => {
//   const database = client.db("Wispi");
//   const collection = database.collection("users");
//   try {
//     const result = await collection.find().toArray();
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: "Error getting users" });
//   }
// });


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    startServer();
  } catch (e) {
    await client.close();
    console.error(e);
  }
}

function startServer() {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

run();