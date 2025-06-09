const express = require('express')
const {dbConnection} = require('./config/db.js')
const productRoutes = require('./routes/productRoutes.js')
const methodOverride = require('method-override')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000
dbConnection()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.use('/', productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor conectado http:/localhost:${PORT}`)
})