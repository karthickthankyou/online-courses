
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const connectDB = require('./config/db');

// Dotenv configuration
dotenv.config({ path: './config/config.env' })

// Connect DB
connectDB();


// Routes
const users = require('./routes/users');


const app = express();

// Body parses
app.use(express.json());

const PORT = process.env.PORT || 5000;


app.use('/api/v1/users', users);

app.get('/', (req, res) => {
  res.json({ msg: 'Hello there' })
})

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`.america.bold.italic);
})
