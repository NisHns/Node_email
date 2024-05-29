// server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// Handle form submission
app.post('/send', (req, res) => {
    const { name, email, message } = req.body;

    // Validation (simple example)
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Nodemailer setup
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'wizzgodplays@gmail.com',
            pass: 'NisH@1202'
        }
    });

    let mailOptions = {
        from: 'wizzgodplays@gmail.com',
        to: 'shindenishant200@gmail.com',
        subject: 'New Contact Form Submission',
        text: `You have a new message from ${name} (${email}):\n\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to send email' });
        }
        res.status(200).json({ message: 'Email sent successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
