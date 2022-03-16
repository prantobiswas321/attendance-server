const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());

// attendance
// y0iMwFrBvnD6e560

const uri = "mongodb+srv://attendance:y0iMwFrBvnD6e560@cluster0.1ujyx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      await client.connect();
      const database = client.db("attendanceDB");
      const usersCollection = database.collection("Mst_Users");
      const employeeCollection = database.collection("Mst_Emploeyee");

        console.log('Database connected');
      
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('Running my server');
});

app.listen(port, ()=>{
    console.log('Running server on port',port);
})