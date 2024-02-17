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
const rosaryRoutes = require('./routes/rosary');


// app
const app = express();
app.set('trust proxy', true);

// db
mongoose
  .connect(process.env.DATABASE, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false
})
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
 }))
app.use(cookieParser());
// cors
if (process.env.NODE_ENV === 'production') {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
} 
else {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// // Add this middleware for debugging
// app.use((req, res, next) => {
//   console.log('Received token:', req.headers.authorization);
//   next();
// });

app.use('/api', authRoutes);
app.use('/api', churchRoutes);
app.use('/api', confessionRoutes);
app.use('/api', intentionRoutes);
app.use('/api', massAttendanceRoutes);
app.use('/api', rosaryRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});