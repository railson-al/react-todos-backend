const express = require('express');
const cors = require('cors');

const TaskRoutes = require('./routes/TaskRoutes');


const server = express();

server.use(cors({
    origin: 'http://localhost:3000'
}));

server.use(express.json());
server.use('/task', TaskRoutes);

server.listen(3333, () => {
    console.log('API Online!')
});