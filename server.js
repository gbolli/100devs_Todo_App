const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const PORT = 3000;
require('dotenv').config();

// Mongo DB setup
let db,
    db_connectionString = process.env.DB_STRING,
    db_name = 'todo';

MongoClient.connect(db_connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${db_name} database`);
        db = client.db(db_name);
    })

// Set & Use
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes

app.get('/', (req, res) => {
    db.collection('todos').find().toArray()
        .then(data => {
            res.render('index.ejs', { items: data });
        })
        .catch(error => console.error(error))
})

app.delete('/deleteItem', (req, res) => {
    db.collection('todos').deleteOne({thing: req.body.itemFromJS})
        .then(result => {
            console.log('Todo deleted (log)');
            res.json('Todo deleted (json response)');
        })
        .catch(err => console.error(err));
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
