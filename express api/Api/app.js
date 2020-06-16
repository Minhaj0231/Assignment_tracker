const express = require('express');
const path = require('path');
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileupload = require('express-fileupload');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const  rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const  errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/db');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter  = require('./routes/auth')
const teacherRouter = require('./routes/teacher')

// Load env vars
dotenv.config({ path: './config/dev.env' });

// Connect to database
connectDb();

const app = express();

// Body parser
app.use(bodyParser.json());




// File uploading
// app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss())

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100
  });
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());



app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/teacher',teacherRouter);

app.use(errorHandler);





module.exports = app;
