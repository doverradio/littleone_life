const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require("./routes/auth");
// const productRoutes = require('./routes/productRoutes');


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

app.use('/api', authRoutes);
// app.use('/api', productRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});