const express = require('express');
const driversRouter = express.Router();
const db = require()

driversRouter.get('/', (req,res) => {
    db.query(`SELECT * FROM Drivers`, (err, row) => {
        if(err){
            throw err;
        } else {
            res.json({driver: row});
        }
    });
});

module.exports = driversRouter;