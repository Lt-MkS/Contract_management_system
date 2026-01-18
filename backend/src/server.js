const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const blueprintRoutes = require('./routes/blueprints');
const contractRoutes = require('./routes/contracts');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/blueprints', blueprintRoutes);
app.use('/api/contracts', contractRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
