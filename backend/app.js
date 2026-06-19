const express = require('express');
const app = express();
const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/usersRoutes');
const managerRoutes = require('./Routes/managerRoutes');
const driverRoutes = require('./Routes/driverRoutes');
const vehicleRoutes = require('./Routes/vehicleRoutes');
const journeyRoutes = require('./Routes/journeyRoutes');
const tripRoutes = require('./Routes/tripRoute')

// Middleware
app.use(express.json());

// Routes
app.use('/api/journeys', journeyRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/managers', managerRoutes);
app.use('/api/trip',tripRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to FleetSync ERP API');
});

module.exports = app;