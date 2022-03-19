const express = require('express');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1ujyx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      await client.connect();
      const database = client.db("attendanceDB");
      const usersCollection = database.collection("Mst_Users");
      const employeeCollection = database.collection("Mst_Emploeyee");
      const attendanceCollection = database.collection("Dat_EmpAttendancedays");

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
        });

        // post api login
        app.post('/login', async (req, res)=>{
            const userName = req.body.userName;
            const password = req.body.password;

            const result = await usersCollection.findOne({userName: userName, password: password});

            if(result){
                const user = {
                    id: 1, 
                    username: 'brad',
                    email: 'brad@gmail.com'
                  }

                jwt.sign({user},'secretkey', { expiresIn: '3000s' }, (err, token) => {
                    res.json({
                      token
                    });
                  });
            } 
        })

        // post api
        app.post('/employees/attendance', async (req,res)=>{
            const attendance = req.body;
            const result = await attendanceCollection.insertOne(attendance);
            res.json(result);
        });
      
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