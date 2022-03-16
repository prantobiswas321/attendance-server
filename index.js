const express = require('express');
const app = express();
const port = 5000;

app.get('/',(req,res)=>{
    res.send('Running my server');
});

app.listen(port, ()=>{
    console.log('Running server on port',port);
})