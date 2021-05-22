const express=require('express');
const bodyParser=require('body-parser')
const DataService=require('./routes/dataservice')
const app=express();
app.use(bodyParser.json());
app.use('/api/v1/data',DataService)
app.listen(3003,()=>{
    console.log('DataService is running on 3003')
})


