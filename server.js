require('dotenv').config();
console.log('Twilio ENV:', process.env.TWILIO_SID, process.env.TWILIO_VERIFY_SID);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Connect DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>console.log('MongoDB connected'))
  .catch(err=>{ console.error(err); process.exit(1); });

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use("/api/sms", require("./routes/smsRoutes"));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/partners', require('./routes/partnerRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

app.get('/', (req, res) => res.send({ status: 'GharCare API running' }));

app.listen(port, () => console.log(`Server running on port ${port}`));
