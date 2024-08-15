const User = require('../models/user');
const nodemailer = require('nodemailer');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

exports.updateUserRole = async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;

    try {
        const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user role' });
    }
};

exports.sendNotificationEmail = async (req, res) => {
    const { to, subject, text, html } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            host: 'mail.littleone.life',
            port: 587,
            secure: false,
            auth: {
                user: 'notification@littleone.life',
                pass: process.env.NOTIFICATION_EMAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: 'notification@littleone.life',
            to,
            subject,
            text,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        res.json({ message: 'Email sent successfully', info });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
};
