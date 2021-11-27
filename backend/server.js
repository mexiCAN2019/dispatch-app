const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan')
require('dotenv').config();


const PORT = process.env.PORT || 5000;

// const mysql = require('mysql');
const mysql = require('mysql2');

const db = mysql.createConnection ({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

db.connect();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


/* const apiRouter = require('./api/api');
app.use('/api', apiRouter); */

// DRIVERS

app.get('/drivers', (req,res) => {
    db.query(`SELECT * FROM Drivers WHERE employed = 1;`, (err, rows) => {
        if(err){
            throw err;
        } else {
            res.status(200).json({drivers: rows});
        }
    });
});

app.post('/drivers', (req,res) => {
    const newDriver = req.body.driver;
    if(!newDriver.firstName || !newDriver.lastName || !newDriver.truckNumber || !newDriver.phoneNumber){
        res.sendStatus(400);
    } else{
        db.query(`INSERT INTO Drivers SET ?;`, {
            firstName: newDriver.firstName,
            lastName: newDriver.lastName,
            phoneNumber: newDriver.phoneNumber,
            truckNumber: newDriver.truckNumber,
            employed: newDriver.employed
        }, (err, row) => {
            if(err){
                throw err;
            } else{
                console.log(row);
                res.sendStatus(201);
            }
        });
    }
});

app.get('/drivers/:driverId', (req,res) => {
    db.query(`SELECT * FROM Drivers WHERE id = ${req.params.driverId};`, (err,row) => {
        if(err){
            throw err;
        } else {
            res.status(200).json({driver: row});
        }
    });
});

app.put('/drivers/:driverId', (req,res) => {
    const updatedDriver = req.body.driver;
    console.log(updatedDriver);
    if(!updatedDriver.firstName || !updatedDriver.lastName || !updatedDriver.truckNumber || !updatedDriver.phoneNumber) {
        res.sendStatus(400);
    } else {
        db.query(`UPDATE Drivers SET ? WHERE id = ${req.params.driverId};`, {
            firstName: updatedDriver.firstName,
            lastName: updatedDriver.lastName,
            truckNumber: updatedDriver.truckNumber,
            phoneNumber: updatedDriver.phoneNumber,
            employed: updatedDriver.employed,
            summaryNote: updatedDriver.summaryNote
        }, (err, row) => {
            if(err){
                throw err;
            } else{
                res.sendStatus(200);
            }
        });
    }
});



//LOADS

app.get('/drivers/:driverId/latestLoads/:year', (req,res) => {
    db.query(`SELECT drivers.id, drivers.firstName, drivers.lastName, drivers.phoneNumber, drivers.truckNumber, drivers.employed, drivers.summaryNote, loads.driverId, loads.puDate, loads.puTime, loads.endPUTime, loads.delDate, loads.delTime, loads.endDelTime, loads.broker, loads.notes FROM drivers
    INNER JOIN loads ON drivers.id = loads.driverId
    WHERE driverId = ${req.params.driverId} AND loads.booked = true AND loads.puDate LIKE '______${req.params.year}'
    ORDER BY puDate DESC
    LIMIT 3;`, (err, rows) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({loads: rows});
        }
    });
});


app.get('/drivers/:driverId/bookedLoads/:year/:month', (req,res) => {
    db.query(`SELECT * FROM loads WHERE driverId = ${req.params.driverId} AND booked = true AND delDate LIKE '${req.params.month}____${req.params.year}' 
    ORDER BY puDate DESC;`, (err, rows) => {
        if(err){
            throw err;
        } else {
            res.json({loads: rows});
        }
    });
});

app.get('/drivers/:driverId/bookedLoads/:year', (req,res) => {
    db.query(`SELECT * FROM loads WHERE driverId = ${req.params.driverId} AND booked = true AND delDate LIKE '______${req.params.year}' 
    ORDER BY puDate DESC;`, (err, rows) => {
        if(err){
            throw err;
        } else {
            res.json({loads: rows});
        }
    });
});

app.get('/loadsForCalendar/:year', (req,res) => {
    db.query(`SELECT drivers.firstName, loads.driverId, loads.puCity, loads.puDate, loads.puTime, loads.endPUTime, loads.delCity, loads.delDate, loads.delTime, loads.endDelTime, loads.loadStatus, loads.dispatched, loads.id
                FROM drivers 
                INNER JOIN loads
                ON Drivers.id = loads.driverId
                WHERE booked = true AND delDate LIKE '______${req.params.year}'
                ORDER BY firstName;`, (err, rows) => {
        if(err){
            throw err;
        } else {
            res.json({loads: rows});
        }
    });
});

app.get('/loadsForCalendar/:year/:month', (req,res) => {
    db.query(`SELECT drivers.firstName, loads.driverId, loads.puCity, loads.puDate, loads.puTime, loads.endPUTime, loads.delCity, loads.delDate, loads.delTime, loads.endDelTime, loads.loadStatus, loads.dispatched, loads.id
                FROM drivers 
                INNER JOIN loads
                ON drivers.id = loads.driverId
                WHERE booked = true AND delDate LIKE '${req.params.month}____${req.params.year}'
                ORDER BY firstName;`, (err, rows) => {
        if(err){
            throw err;
        } else {
            res.json({loads: rows});
        }
    });
});

app.get('/unassignedLoads', (req,res) => {
    db.query(`SELECT * FROM loads WHERE driverId = 1 AND booked = true;`, (err, rows) => {
        if(err){
            throw err;
        } else {
            res.json({loads: rows});
        }
    });
});

app.get('/unbookedLoads', (req,res) => {
    db.query(`SELECT * FROM Loads WHERE booked = 0;`, (err, rows) => {
        if(err){
            throw err;
        } else {
            res.json({loads: rows});
        }
    });
});

app.get('/unbookedLoads/:year', (req,res) => {
    db.query(`SELECT * FROM Loads WHERE booked = false AND delDate LIKE '______${req.params.year}' 
    ORDER BY puDate DESC;`, (err, rows) => {
        if(err){
            throw err;
        } else {
            res.json({loads: rows});
        }
    });
});

app.get('/unbookedLoads/:year/:month', (req,res) => {
    db.query(`SELECT * FROM Loads WHERE booked = false AND delDate LIKE '${req.params.month}____${req.params.year}' 
    ORDER BY puDate DESC;`, (err, rows) => {
        if(err){
            throw err;
        } else {
            res.json({loads: rows});
        }
    });
});

app.post('/loads', (req,res) => {
    const newLoad = req.body.load;
    console.log(newLoad);
    if(!newLoad.driverId  || !newLoad.puCity ||!newLoad.puState || !newLoad.puDate || !newLoad.puTime || !newLoad.delCity || !newLoad.delState
        || !newLoad.delDate || !newLoad.delTime || !newLoad.commodity || !newLoad.weight || !newLoad.broker || !newLoad.trailerType || !newLoad.rate
        || newLoad.booked === null || newLoad.reloadLoad === null) {
            res.sendStatus(400);
        } else{
            db.query(`INSERT INTO Loads SET ?;`, {
                            loadID: newLoad.loadID,
                            driverId: newLoad.driverId,
                            puCity: newLoad.puCity,
                            puState: newLoad.puState,
                            puDate: newLoad.puDate,
                            puTime: newLoad.puTime,
                            endPUTime: newLoad.endPUTime,
                            delCity: newLoad.delCity,
                            delState: newLoad.delState,
                            delDate: newLoad.delDate,
                            delTime: newLoad.delTime,
                            endDelTime: newLoad.endDelTime,
                            commodity: newLoad.commodity,
                            weight: newLoad.weight,
                            broker: newLoad.broker,
                            rate: newLoad.rate,
                            notes: newLoad.notes,
                            loadStatus: newLoad.loadStatus,
                            dispatched: newLoad.dispatched,
                            trailerNumber: newLoad.trailerNumber,
                            trailerType: newLoad.trailerType,
                            booked: newLoad.booked,
                            reloadLoad: newLoad.reloadLoad
                        }, (err, row) => {
                            if(err) {
                                throw err;
                            } else{
                                console.log(row);
                                res.status(201).send('Success');
                            }
                        });
        }
});

app.put('/loads/:loadID', (req,res) => {
    const updatedLoad = req.body.load;
    if(!updatedLoad.driverId  || !updatedLoad.puCity ||!updatedLoad.puState || !updatedLoad.puDate || !updatedLoad.puTime || !updatedLoad.delCity || !updatedLoad.delState
        || !updatedLoad.delDate || !updatedLoad.delTime || !updatedLoad.commodity || !updatedLoad.weight || !updatedLoad.broker || !updatedLoad.rate || !updatedLoad.trailerType){
            res.sendStatus(400);
        } else{
            db.query(`UPDATE Loads SET ? WHERE id = ${req.params.loadID};`, {
                            loadID: updatedLoad.loadID,
                            driverId: updatedLoad.driverId,
                            puCity: updatedLoad.puCity,
                            puState: updatedLoad.puState,
                            puDate: updatedLoad.puDate,
                            puTime: updatedLoad.puTime,
                            endPUTime: updatedLoad.endPUTime,
                            delCity: updatedLoad.delCity,
                            delState: updatedLoad.delState,
                            delDate: updatedLoad.delDate,
                            delTime: updatedLoad.delTime,
                            endDelTime: updatedLoad.endDelTime,
                            commodity: updatedLoad.commodity,
                            weight: updatedLoad.weight,
                            broker: updatedLoad.broker,
                            rate: updatedLoad.rate,
                            notes: updatedLoad.notes,
                            loadStatus: updatedLoad.loadStatus,
                            dispatched: updatedLoad.dispatched,
                            trailerNumber: updatedLoad.trailerNumber,
                            trailerType: updatedLoad.trailerType,
                            booked: updatedLoad.booked
            }, (err, row) => {
                if(err){
                    console.log(err);
                } else{
                    res.sendStatus(200);
                }
            });
        }
});

app.delete(`/unbookedLoads/:loadID`, (req,res,next) => {
    db.query(`DELETE FROM Loads WHERE id = ${req.params.loadID};`, (err) => {
        if(err) {
            throw(err);
        } else{
            res.sendStatus(200);
        }
    });
});


//Data

//AVERAGES

//Rate Average for all loads
app.get('/bookedRateAverage', (req,res) => {
    db.query(`SELECT ROUND(AVG(rate), 0) AS "averageRate" FROM loads WHERE booked = 1;`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({average: row});
        }
    });
});

//Year Average for all loads, Doesn't take reloaddLoad in SQL Query
app.get('/bookedRateAverage/:year/2', (req,res) => {
    db.query(`SELECT ROUND(AVG(rate), 0) AS "averageRate", COUNT(*) AS numberOfLoads FROM loads
    WHERE booked = 1 AND delDate LIKE '______${req.params.year}';`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({average: row});
        }
    });
});

//Year Average for either reload or orignal loads
app.get('/bookedRateAverage/:year/:reloadLoad', (req, res) => {
    db.query(`SELECT ROUND(AVG(rate), 0) AS "averageRate", COUNT(*) AS numberOfLoads FROM loads
    WHERE booked = 1 AND delDate LIKE '______${req.params.year}' AND reloadLoad = ${req.params.reloadLoad};`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({average: row});
        }
    });
});

//Year Average for all loads for SPECIFIC DRIVER, Doesn't take reloadLoad in SQL Query
app.get('/bookedRateAverage/:year/2/driver/:driverId', (req,res) => {
    db.query(`SELECT ROUND(AVG(rate), 0) AS "averageRate", COUNT(*) AS numberOfLoads FROM loads
    WHERE booked = 1 AND delDate LIKE '______${req.params.year}' AND driverId = ${req.params.driverId};`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({average: row});
        }
    });
});

//Year Average for either reload or orignal loads for SPECIFIC DRIVER
app.get('/bookedRateAverage/:year/:reloadLoad/driver/:driverId', (req, res) => {
    db.query(`SELECT ROUND(AVG(rate), 0) AS "averageRate", COUNT(*) AS numberOfLoads FROM loads
    WHERE booked = 1 AND delDate LIKE '______${req.params.year}' AND reloadLoad = ${req.params.reloadLoad} AND driverId = ${req.params.driverId};`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({average: row});
        }
    });
});

//Month Average for all loads, Doesn't take reloadLoad in SQL Query
app.get('/bookedRateAverage/:year/:month/2', (req,res) => {
        db.query(`SELECT ROUND(AVG(rate), 0) AS "averageRate", COUNT(*) AS numberOfLoads FROM loads
    WHERE booked = 1 AND delDate LIKE '${req.params.month}____${req.params.year}';`, (err, row) => {
            if(err){
                throw err;
            } else{
                console.log('test');
                res.status(200).json({average: row});
            }
        });
});

//Month Average for either reload or orignal loads
app.get('/bookedRateAverage/:year/:month/:reloadLoad', (req, res) => {
    db.query(`SELECT ROUND(AVG(rate), 0) AS "averageRate", COUNT(*) AS numberOfLoads FROM loads
    WHERE booked = 1 AND delDate LIKE '${req.params.month}____${req.params.year}' AND reloadLoad = ${req.params.reloadLoad};`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({average: row});
        }
    });
});

//Month Average for all loads FOR SPECIFIC DRIVER, Doesn't take reloadLoad in SQL Query
app.get('/bookedRateAverage/:year/:month/2/driver/:driverId', (req,res) => {
        db.query(`SELECT ROUND(AVG(rate), 0) AS "averageRate", COUNT(*) AS numberOfLoads FROM loads
    WHERE booked = 1 AND delDate LIKE '${req.params.month}____${req.params.year}' AND driverId = ${req.params.driverId};`, (err, row) => {
            if(err){
                throw err;
            } else{
                res.status(200).json({average: row});
            }
        });
});

//Month Average for either reload or orignal loads FOR SPECIFIC DRIVER
app.get('/bookedRateAverage/:year/:month/:reloadLoad/driver/:driverId', (req, res) => {
    db.query(`SELECT ROUND(AVG(rate), 0) AS "averageRate", COUNT(*) AS numberOfLoads FROM loads
    WHERE booked = 1 AND delDate LIKE '${req.params.month}____${req.params.year}' AND reloadLoad = ${req.params.reloadLoad} AND driverId = ${req.params.driverId};`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({average: row});
        }
    });
});

//SUMS

//Year Sum for all loads, Doesn't take reloadLoad in SQL Query
app.get('/bookedRateSum/:year/2', (req,res) => {
    db.query(`SELECT SUM(rate) AS "sumRate", COUNT(*) AS numberOfLoads FROM loads
    WHERE booked = 1 AND delDate LIKE '______${req.params.year}';`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({sum: row});
        }
    });
});

//Year Sum for either reload or orignal loads
app.get('/bookedRateSum/:year/:reloadLoad', (req, res) => {
    db.query(`SELECT SUM(rate) AS "sumRate", COUNT(*) AS numberOfLoads FROM loads
    WHERE booked = 1 AND delDate LIKE '______${req.params.year}' AND reloadLoad = ${req.params.reloadLoad};`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({sum: row});
        }
    });
});

//Year Sum for all loads for SPECIFIC DRIVER, Doesn't take reloadLoad in SQL Query
app.get('/bookedRateSum/:year/2/driver/:driverId', (req,res) => {
    db.query(`SELECT SUM(rate) AS "sumRate", COUNT(*) AS numberOfLoads FROM loads
    WHERE booked = 1 AND delDate LIKE '______${req.params.year}' AND driverId = ${req.params.driverId};`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({sum: row});
        }
    });
});

//Year Sum for either reload or orignal loads FOR SPECIFIC DRIVER
app.get('/bookedRateSum/:year/:reloadLoad/driver/:driverId', (req, res) => {
    db.query(`SELECT SUM(rate) AS "sumRate", COUNT(*) AS numberOfLoads FROM loads
    WHERE booked = 1 AND delDate LIKE '______${req.params.year}' AND reloadLoad = ${req.params.reloadLoad} AND driverId = ${req.params.driverId};`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({sum: row});
        }
    });
});

//Month Sum for all loads, Doesn't take reloadLoad in SQL Query
app.get('/bookedRateSum/:year/:month/2', (req,res) => {
    db.query(`SELECT SUM(rate) AS "sumRate", COUNT(*) AS numberOfLoads FROM loads
WHERE booked = 1 AND delDate LIKE '${req.params.month}____${req.params.year}';`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({sum: row});
        }
    });
});

//Month Sum for either reload or orignal loads
app.get('/bookedRateSum/:year/:month/:reloadLoad', (req, res) => {
    db.query(`SELECT SUM(rate) AS "sumRate", COUNT(*) AS numberOfLoads FROM loads
    WHERE booked = 1 AND delDate LIKE '${req.params.month}____${req.params.year}' AND reloadLoad = ${req.params.reloadLoad};`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({sum: row});
        }
    });
});

//Month Sum for all loads for SPECIFIC DRIVER, Doesn't take reloadLoad in SQL Query
app.get('/bookedRateSum/:year/:month/2/driver/:driverId', (req,res) => {
    db.query(`SELECT SUM(rate) AS "sumRate", COUNT(*) AS numberOfLoads FROM loads
WHERE booked = 1 AND delDate LIKE '${req.params.month}____${req.params.year}' AND driverId = ${req.params.driverId};`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({sum: row});
        }
    });
});

//Month Sum for either reload or orignal loads for SPECIFIC DRIVER
app.get('/bookedRateSum/:year/:month/:reloadLoad/driver/:driverId', (req, res) => {
    db.query(`SELECT SUM(rate) AS "sumRate", COUNT(*) AS numberOfLoads FROM loads
    WHERE booked = 1 AND delDate LIKE '${req.params.month}____${req.params.year}' AND reloadLoad = ${req.params.reloadLoad} AND driverId = ${req.params.driverId};`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({sum: row});
        }
    });
});



app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});


