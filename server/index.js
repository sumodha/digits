// mongodb+srv://sumo:<db_password>@digits.ndytq.mongodb.net/?retryWrites=true&w=majority&appName=digits

const express = require('express');
const connectDB = require('./db.js');
const itemModel = require('./models/item.js');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

connectDB();


app.listen(3000, () => {
    console.log("app is running");
}
);