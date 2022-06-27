const express = require('express');
const app = express();

const authRoutes = require('./api/routes/auth');
const restartRoutes = require('./api/routes/restart');


app.use('/auth', authRoutes);
app.use('/restart', restartRoutes);


module.exports = app;