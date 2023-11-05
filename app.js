const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const smartBinRoutes = require('./routes/smartBinRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 9090;

app.use(bodyParser.json());

connectDB(); // Connect to MongoDB

app.use('/api/smartbin', smartBinRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/users', userRoutes);

// Default index route
app.get('/', (req, res) => {
  res.send('Welcome to the Smart Bin API!');
});

// Wildcard route for all other routes
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
