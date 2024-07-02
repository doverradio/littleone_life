const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require("./routes/auth");
const churchRoutes = require('./routes/church');
const confessionRoutes = require('./routes/confession');
const intentionRoutes = require('./routes/intentions');
const massAttendanceRoutes = require('./routes/massAttendance');
const prayerRoutes = require('./routes/prayer');
const rosaryRoutes = require('./routes/rosary');
const userRoutes = require('./routes/user');

// app
const app = express();
app.set('trust proxy', true);

// db
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log('DB connected'))
  .catch(err => {
    console.log(err);
  });

// middlewares
app.use(morgan('common', {
    stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.json({
  type: ['application/json', 'text/plain']
}));
app.use(cookieParser());

// cors
app.use(cors({ 
  origin: `${process.env.CLIENT_URL}`,
  credentials: true
}));

// Custom request logger middleware for debugging
const requestLogger = (req, res, next) => {
    console.log(`Received ${req.method} request for ${req.originalUrl}`);
    console.log('Request Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Request Body:', JSON.stringify(req.body, null, 2));
    next();
};

app.use(requestLogger);

app.use('/api', authRoutes);
app.use('/api', churchRoutes);
app.use('/api', confessionRoutes);
app.use('/api', intentionRoutes);
app.use('/api', massAttendanceRoutes);
app.use('/api', prayerRoutes);
app.use('/api', rosaryRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
