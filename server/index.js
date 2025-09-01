import express from 'express';
import {connectDB, getCollection} from './db.js';
import itemModel from './models/item.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

await connectDB();
const collection = await getCollection();

app.get('/', async (req, res) => {
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


app.listen(3001, () => {
    console.log("app is running");
}
);