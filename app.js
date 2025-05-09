const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const { swaggerUi, specs } = require('./swagger');


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/auth', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const nbtiRoutes = require('./routes/nbtiRoutes');
app.use('/nbti', nbtiRoutes);


module.exports = app;
