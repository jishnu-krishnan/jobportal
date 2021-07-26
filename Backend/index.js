const express = require('express')
const cors = require('cors')
const path = require('path');
const dotenv = require('dotenv')
const morgan = require('morgan')
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

const users = require('./routes/users');
const hr = require('./routes/hr')

app.use(cors())

app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:4200'],
    credentials:true
  }));

// Set Static Floder
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// Morgan- to see the request in terminal
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
  }

// Passport config
require('./config/passport')(passport);

// Sessions
app.use(
    session({
      secret: 'yoursecret',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
  
// Passport Middle ware
app.use(passport.initialize());
app.use(passport.session());


app.use('/users', users)
app.use('/hr',hr)


const port = process.env.PORT || 8080;


app.listen(port,()=>{
    console.log(`server is running on port:${port}`);
});