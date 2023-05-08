const express = require('express');
const { Client } = require("pg");

const app = express();
const port = 5000;

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Jeremi2002",
    database: "postgres",
});

client.connect()


app.get('/', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    //const q  = req.query.q

    // const item = items.find({$regex: q});
    // res.json(search(item));

    const { rows } = await client.query('SELECT * FROM onlinestore.items');
    res.send(rows);
});

app.listen(port, () => {
    console.log('API is working!')
})