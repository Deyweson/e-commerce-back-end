require('dotenv').config();
const cors = require('cors')
const express = require('express');
const app = express();
const routes = require('./src/routes/routes')

app.use(cors())
app.use(express.json());
app.use(routes)

app.listen(process.env.PORT);