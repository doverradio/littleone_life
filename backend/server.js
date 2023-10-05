const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log("DB Connected"));

const authRoutes = require("./routes/auth");
const productRoutes = require('./routes/productRoutes');

app.use('/api', productRoutes);

const PORT = process.env.PORT || 8125;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});