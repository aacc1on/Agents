const express = require('express');
require('dotenv').config();
const agents = require('./routes/agents.js');
const misions =require('./routes/mission.js');
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use('/agents', agents);
app.use('/misions', misions);

app.listen(PORT, ()=>{console.log(`http://localhost:${PORT}`)});
