require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
const carRoutes = require('./src/routes/cars.routes');
const rentalRoutes = require('./src/routes/rentals.routes');
const paymentRoutes = require('./src/routes/payment.routes');
const webhookRoutes = require('./src/routes/webhook.routes');
const authRoutes = require('./src/routes/auth.routes');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/cars', carRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4500;

app.get('/', (req,res)=> res.send('TechyJaunt-Auth Full API v3'));

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server listening on http://localhost:${PORT}`);
});
