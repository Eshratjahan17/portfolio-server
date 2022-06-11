const express = require("express");
const app = express();
const cors = require("cors");
const port =process.env.PORT||5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.80o1c.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


async function run(){
  try{
     await client.connect();
      const projectsCollection = client.db("portfolio").collection("projects");

      //all data
          app.get("/projects", async (req, res) => {
            const q = req.query;
            console.log(q);
            const cursor = projectsCollection.find(q);
            const result = await cursor.toArray();
            res.send(result);
          });
          //data by id
          app.get("/projects/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const project = await projectsCollection.findOne(query);
            res.send(project);
          });

  }
  finally{

  }
  console.log("database connected");

}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running server");
});

app.listen(port, () => {
  console.log(` Listening to port ${port}`);
});
