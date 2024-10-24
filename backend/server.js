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
    secure: process.env.USE_HTTPS === 'true', // Only secure in production
    sameSite: process.env.USE_HTTPS === 'true' ? 'Lax' : 'Strict', // 'Lax' for production, 'Strict' for dev
    domain: process.env.USE_HTTPS === 'true' ? '.littleone.life' : undefined, // Only set domain in production
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
const allowedOrigins = [
  process.env.CLIENT_URL, // The main production client
  process.env.DEV_URL, // Add your development URL here if necessary
  process.env.SHOP_URL, // URL for the shop subdomain if required
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or CURL requests)
    if (!origin) return callback(null, true);

    // Check if the origin is in the allowedOrigins array
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.error('Blocked by CORS. Origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials to be passed with requests
}));

// app.use(cors({ 
//   origin: `${process.env.CLIENT_URL}`,
//   credentials: true
// }));

// Define routes
app.use('/api', adminRoutes);
app.use('/api', aiRoutes);
app.use('/api', authRoutes);
app.use('/api', churchRoutes);
app.use('/api', confessionRoutes);
app.use('/api', emailRoutes);
app.use('/api', intentionRoutes);
app.use('/api', massAttendanceRoutes);
app.use('/api', notificationRoutes);
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
