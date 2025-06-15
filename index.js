const express = require('express')
const {dbConnection} = require('./config/db.js')
const productRoutes = require('./routes/productRoutes.js')
const methodOverride = require('method-override')
const session = require('express-session')
const authRoutes = require('./routes/authRoutes.js')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000
dbConnection()

app.use(express.static(__dirname + "/public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.get('/', (req, res) => {
  res.redirect('/products');
});

app.use('/', authRoutes)

const authMiddleware = require('./middlewares/authMiddleware')
app.use('/dashboard', authMiddleware)

app.use('/', productRoutes)

app.listen(PORT, () => {
  console.log(`Servidor conectado http:/localhost:${PORT}`)
})