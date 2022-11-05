require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const routes = require('./routes/routes');
const mongoString = process.env.DATABASE_URL;
const port = process.env.PORT;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // <--- Here
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', routes)

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})
