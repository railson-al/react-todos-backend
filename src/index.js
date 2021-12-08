const express = require('express');

const TaskRoutes = require('./routes/TaskRoutes');

const server = express();
server.use(express.json());
server.use('/task', TaskRoutes);

server.listen(3000, () => {
    console.log('API Online!')
})