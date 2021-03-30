const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cors());

const port = 5000;
app.listen(port,()=>{
    console.log("I am listening on " , port);
})

app.get('/',(req,res)=>{
    res.send('hello world');
    console.log("Body :",req.body);

})