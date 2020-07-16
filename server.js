//run certain config when not in production
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require ("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require('body-parser')

//call index.js
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

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
//bodyParser
app.use(bodyParser.urlencoded({limit:'10mb', extended:false}))
//for db
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true,useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('error', error => console.error('Connected'))
//tell the server that '/' leads to the path set by indexRouter
app.use('/', indexRouter)
//for author Router
app.use('/authors', authorRouter)
app.listen(process.env.PORT || 3000)
