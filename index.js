const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const ObjectId = require('mongodb').ObjectId;
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

        // console.log('Database connected');
        // get api
        app.get('/employees', async (req,res)=>{
            const result = await employeeCollection.find({}).toArray();
            // console.log(result);
            res.send(result);
        });

        app.get('/employees/:id', async (req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const employee = await employeeCollection.findOne(query);
            console.log('load employee with id:', id);
            res.send(employee);
        })
      
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('Running my server');
});

app.listen(port, ()=>{
    console.log('Running server on port',port);
})