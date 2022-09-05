const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const connectDB = require('./config/database')

const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')


require('dotenv').config({ path: './config/.env' });

const PORT = process.env.PORT;

connectDB()

// Set & Use
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes

app.use('/', mainRoutes)
app.use('/todos', todoRoutes)


app.delete('/deleteItem', (req, res) => {
    db.collection('todos').deleteOne({thing: req.body.itemFromJS})
        .then(result => {
            console.log('Todo deleted');
            res.json('Todo deleted');
        })
        .catch(err => console.error(err));
})

app.put('/markComplete', (req, res) => {
    db.collection('todos').updateOne({thing: req.body.itemFromJS},
        { $set: { completed: true }},
        {
            sort: {_id: -1 },
            upsert: false
        })
        .then(result => {
            console.log('Todo marked complete');
            res.json('Todo marked complete');
        })
        .catch(err => console.error(err));
})

app.put('/markUnComplete', (req, res) => {
    db.collection('todos').updateOne({thing: req.body.itemFromJS},
        { $set: { completed: false }},
        {
            sort: {_id: -1 },
            upsert: false
        })
        .then(result => {
            console.log('Todo marked unCcomplete');
            res.json('Todo marked unComplete');
        })
        .catch(err => console.error(err));
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

// TODO:  add authentication
