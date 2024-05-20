require('dotenv').config();  // Load environment variables

console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('DB_DIALECT:', process.env.DB_DIALECT);

if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set!');
    process.exit(1);  // Exit the application with an error code
  }

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models'); // Import database models

const app = express();
const port = process.env.PORT || 3001;

// Middleware
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');
const { body } = require('express-validator');
const validateRequest = require('./middleware/validateRequest');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

// Import routes
const resourceRoutes = require('./routes/resources');
const authRoutes = require('./routes/auth');
const subscriberRoutes = require('./routes/subscribers');
const engagementRoutes = require('./routes/engagement');

// Use routes
app.use('/api/resources', resourceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/subscribers', [
    body('email').isEmail().withMessage('Invalid email address'),
    validateRequest,
    subscriberRoutes
]);
app.use('/api/engagement', engagementRoutes);

app.get('/', (req, res) => {
    res.send('Hello World from Express with Sequelize!');
});

// Error handling middleware should be the last middleware
app.use(errorHandler);

// Sync database and start server
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});
