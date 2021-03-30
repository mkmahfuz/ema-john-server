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
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 30000, keepAlive: 1 });
client.connect(err => {
    const productsCollection = client.db("emaJohnStore").collection("products");
    const ordersCollection = client.db("emaJohnStore").collection("orders"); // add this code from mod-48-7

    // perform actions on the collection object
    console.log("DB Connected");

    // all the db related api will be here

    //post one product 
    app.post('/addProduct', (req, res) => {
        const product = req.body;
        console.log(product);
        productsCollection.insertOne(product)
            .then((result) => {
                console.log(result);
            })
    })

    //post one order
    app.post('/addOrder', (req, res) => {
        const order = req.body;
        console.log(order);
        ordersCollection.insertOne(order)
            .then((result) => {
                // console.log(result);
                res.send(result.insertedCount>0);
            })
    })





    //post many products at a time 
    app.post('/addProducts', (req, res) => {
        const allproducts = req.body;
        //console.log(products);
        productsCollection.insertMany(allproducts)
            .then((result) => {
                console.log(result);
                res.send(result.insertedCount);
            })
    })
    //get all products from database
    app.get('/products', (req, res) => {

        productsCollection.find({}).toArray((err, docs) => {
            console.log({ err });
            res.send(docs);

        })

    })
    //get single product with key database
    app.get('/product/:key', (req, res) => {

        const pdkey = req.params.key;
        productsCollection.find({ key: pdkey }).toArray((err, docs) => {
            console.log({ err });
            res.send(docs);

        })

    })

    //get some products from db
    app.post('/productsByKeys', (req, res) => {
        const productKeys = req.body;
        console.log(productKeys);
        productsCollection.find({ key: { $in: productKeys } })
            .toArray((err, docs) => { res.send(docs) })
    })


    //client.close();  
});
