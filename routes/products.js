var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient

// warehouse == database
// producten == collection

MongoClient.connect('mongodb://localhost:27017', (err, database) => {
    if (err) return console.log(err);
    db = database.db('warehouse');
});

router.get('/', function (req, res) {
    db.collection("producten").find().toArray((err, data) => {
        if (err) console.log(err);
        res.json(data);
    })
});

router.get('/:naam', (req, res) => {
    db.collection("producten").find({ naam: { $regex: `.*${req.params.naam}.* ` } }).toArray((err, data) => {
        if (err) console.log(err);
        res.json(data);
    })
});


router.post('/add', (req, res) => {
    if (!req.body) return;
    db.collection("producten").insertOne(req.body, (err, response) => res.json(response));
});

router.delete('/:naam', (req, res) => {
    if (!req.params.naam) return;
    console.log(req.params.naam)
    db.collection("producten").findOneAndDelete({naam: req.params.naam}, (err, response) => res.json(response));
});

module.exports = router;
