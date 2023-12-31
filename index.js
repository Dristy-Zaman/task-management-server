const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());


console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qq0ad0c.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();



    const taskCollection = client.db('taskManagementDb').collection('task');




    //task

    app.get('/task', async (req, res) => {
        const cursor = taskCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      })



      app.post('/task', async (req, res) => {
        const BeATrainer = req.body;
        console.log(BeATrainer);
        const result = await taskCollection.insertOne(BeATrainer);
        res.send(result);
    });





    app.delete('/task/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) }
        const result = await taskCollection.deleteOne(query);
        res.send(result);
    })




    app.patch('/task/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedJob = req.body;
      console.log(updatedJob);
      const updateDoc = {
          $set: {
              status: updatedJob.status
          },
      };
      const result = await taskCollection.updateOne(filter, updateDoc);
      res.send(result);
  })




















































    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);















































































app.get('/', (req, res) => {
    res.send('Task Management app is running')
})

app.listen(port, () => {
    console.log(`Task Management app Server is running on port ${port}`)
})