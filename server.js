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


app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

// TODO:  add authentication
