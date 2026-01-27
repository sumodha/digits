import express from 'express';
import {connectDB} from './db.js';
import cors from 'cors';
import {corsOptions} from './corsOptions.js';
const PORT = process.env.PORT


const app = express();
app.use(express.json());
app.use(cors(corsOptions));


const collection = await connectDB();

app.get('/game', async (req, res) => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let dateQuery = month + "/" + day;
    console.log(dateQuery);
    const query = {"date": dateQuery};
    const response = await collection.findOne(query);
    console.log(response);
    return res.json({items: response});

});


app.listen(PORT, () => {
    console.log("app is running");
}
);