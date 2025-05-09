const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const plannerRoutes = require('./routes/plannerRoutes');
const { swaggerUi, specs } = require('./swagger');


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/auth', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const nbtiRoutes = require('./routes/nbtiRoutes');
app.use('/nbti', nbtiRoutes);

const projectRoutes = require('./routes/projectRoutes');
app.use('/projects', projectRoutes);

app.use('/planners', plannerRoutes);

module.exports = app;
