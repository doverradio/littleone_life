const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();


const aiRoutes = require('./routes/ai');
const authRoutes = require("./routes/auth");
const adminRoutes = require('./routes/admin'); // Add this line
const churchRoutes = require('./routes/church');
const confessionRoutes = require('./routes/confession');
const intentionRoutes = require('./routes/intentions');
const massAttendanceRoutes = require('./routes/massAttendance');
const notificationRoutes = require('./routes/notification');
const prayerRoutes = require('./routes/prayer');
const rosaryRoutes = require('./routes/rosary');
const userRoutes = require('./routes/user');
const prayerSpaceRoutes = require('./routes/prayerSpaces'); // New prayer space routes
const stripeRoutes = require('./routes/stripe'); // Stripe routes
const emailRoutes = require('./routes/email'); // Email routes

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
app.use('/api', aiRoutes);
app.use('/api', authRoutes);
app.use('/api', adminRoutes); // Add this line
app.use('/api', churchRoutes);
app.use('/api', confessionRoutes);
app.use('/api', intentionRoutes);
app.use('/api', massAttendanceRoutes);
app.use('/api', notificationRoutes);
app.use('/api', prayerRoutes);
app.use('/api', rosaryRoutes);
app.use('/api', userRoutes);
app.use('/api/prayerSpaces', prayerSpaceRoutes); // New prayer space routes
app.use('/api/stripe', stripeRoutes); // Stripe routes
app.use('/api', emailRoutes); // Email routes

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
