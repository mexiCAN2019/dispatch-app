const express = require('express');
const loadsRouter = express.Router();
const db = require('./../server');

loadsRouter.get('/', (req,res) => {
    db.query(`SELECT * FROM Loads`, (err, row) => {
        if(err){
            throw err;
        } else {
            res.json({load: row});
        }
    });
});

module.exports = loadsRouter;