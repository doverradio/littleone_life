const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const adminRoutes = require('./routes/admin');
const aiRoutes = require('./routes/ai');
const authRoutes = require("./routes/auth");
const churchRoutes = require('./routes/church');
const confessionRoutes = require('./routes/confession');
const emailRoutes = require('./routes/email');
const intentionRoutes = require('./routes/intentions');
const massAttendanceRoutes = require('./routes/massAttendance');
const notificationRoutes = require('./routes/notification');
const prayerRoutes = require('./routes/prayer');
const prayerSpaceRoutes = require('./routes/prayerSpaces');
const rosaryRoutes = require('./routes/rosary');
const stripeRoutes = require('./routes/stripe');
const userRoutes = require('./routes/user');

// app
const app = express();
app.set('trust proxy', true);
const server = http.createServer(app);
const io = socketIo(server);

// db
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log('DB connected'))
  .catch(err => {
    console.log(err);
  });

// session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.DATABASE }),
  cookie: {
    maxAge: 2 * 60 * 60 * 1000, // 2 hours
    httpOnly: true,
    secure: process.env.USE_HTTPS === 'true', // Ensure cookies are only sent over HTTPS when set to true
    sameSite: 'Lax', // Allows cookies to be sent with cross-origin subdomain requests
    domain: process.env.USE_HTTPS === 'true' ? '.littleone.life' : undefined, // Set domain for production only
  }
}));


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

// Define routes
app.use('/api', adminRoutes);
app.use('/api', aiRoutes);
app.use('/api', authRoutes);
app.use('/api', churchRoutes);
app.use('/api', confessionRoutes);
app.use('/api', emailRoutes);
app.use('/api', intentionRoutes);
app.use('/api', massAttendanceRoutes);
app.use('/notify', notificationRoutes);
app.use('/api', prayerRoutes);
app.use('/api', prayerSpaceRoutes);
app.use('/api', rosaryRoutes);
app.use('/api', stripeRoutes);
app.use('/api', userRoutes);

// Socket.io connection
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinSpace', (spaceId) => {
        socket.join(spaceId);
        console.log(`Client joined space: ${spaceId}`);
    });

    socket.on('message', (data) => {
        io.in(data.spaceId).emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
