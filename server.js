const express = require('express');
const app = express();
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')

require('dotenv').config({ path: './config/.env' });

connectDB()

// Set & Use
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes

app.use('/', mainRoutes)
app.use('/todos', todoRoutes)


app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})

// TODO:  add authentication
