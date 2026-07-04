const express = require('express');
const app = express();
const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/usersRoutes');
const managerRoutes = require('./Routes/managerRoutes');
const driverRoutes = require('./Routes/driverRoutes');
const vehicleRoutes = require('./Routes/vehicleRoutes');
const tripRoutes = require('./Routes/tripRoute')
const citiesRoutes = require('./Routes/citiesRoutes')
const cors = require('cors')

// Middleware
app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({limit : '10mb', extended: true}))
app.use(cors());

// Routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/managers', managerRoutes);
app.use('/api/trips',tripRoutes);
app.use('/api/cities',citiesRoutes)
app.get('/', (req, res) => {
  res.send('Welcome to FleetSync ERP API');
});

module.exports = app;