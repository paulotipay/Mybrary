if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require ("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")

//call index.js
const indexRouter = require('./routes/index')

//view engine
app.set('view engine', 'ejs')
//set for views
app.set('views',__dirname +'/views')
//layout files - partials
app.set('layout', 'layouts/layout')
//use layouts
app.use(expressLayouts)
//for css, images etc
app.use(express.static('public'))

//for db
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true,useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('error', error => console.error('Connected'))
//tell the server that '/' leads to the path set by indexRouter
app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)
