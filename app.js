const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require("express-handlebars")
const passport = require('passport')
const session = require('express-session')
const connectDB = require('./config/db')

const mainRouter = require('./routes/index')
const authRouter = require('./routes/auth')

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

connectDB()

const app = express()

// Logging
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false, 
    saveUninitialized: false,
    // cookie: { secure: true },
    // store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// Passport middleware
app.use(passport.initialize()) 
app.use(passport.session())

// Static folder 
app.use(express.static(path.join(__dirname, 'public')))

// Routes 
app.use('/', mainRouter)
app.use('/auth', authRouter)

const PORT = process.env.PORT || 3000

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
))