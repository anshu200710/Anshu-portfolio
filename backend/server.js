const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', (req,res) => res.json('API IS WORKING'))

app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'apanu2007@gmail.com', // replace with your email
      pass: 'peku yzyz kcab xxod',    // use Gmail App Password (not regular password)
    },
  });

  const mailOptions = {
    from: email,
    to: 'apanu2007@gmail.com',
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  };
//peku yzyz kcab xxod
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
