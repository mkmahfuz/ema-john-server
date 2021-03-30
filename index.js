const express = require('express');
const cors = require('cors');
const app = express();

//env config and db cred
require('dotenv').config();
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

//app-use
app.use(express.json());
app.use(cors());



//port and listen
const port = 5000;
app.listen(port, () => {
    console.log("I am listening on ", port);
})

app.get('/', (req, res) => {
    res.send('hello world');
    console.log("Body :", req.body);

})

//mongo db connection
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.lroqv.mongodb.net/emaJohnStore?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const products = client.db("emaJohnStore").collection("products");
    // perform actions on the collection object
    console.log("DB Connected");

    // all the db related api will be here

    //post one product 
    app.post('/addProduct', (req, res) => {
        const product = req.body;
        products.insertOne(product)
            .then((result) => {
                console.log(result);
            })
    })

    //client.close();  
});
