const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan')

const PORT = process.env.PORT || 3002;

const mysql = require('mysql');
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'Fedalwhoop19',
    database: 'kgtransport'
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

app.get('/drivers/:driverID', (req,res) => {
    db.query(`SELECT * FROM Drivers WHERE id = ${req.params.driverID};`, (err,row) => {
        if(err){
            throw err;
        } else {
            res.status(200).json({driver: row});
        }
    });
});

app.put('/drivers/:driverID', (req,res) => {
    const updatedDriver = req.body.driver;
    console.log(updatedDriver);
    if(!updatedDriver.firstName || !updatedDriver.lastName || !updatedDriver.truckNumber || !updatedDriver.phoneNumber) {
        res.sendStatus(400);
    } else {
        db.query(`UPDATE Drivers SET ? WHERE id = ${req.params.driverID};`, {
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

app.get('/drivers/:driverID/latestLoad', (req,res) => {
    db.query(`SELECT Drivers.id, Drivers.firstName, Drivers.lastName, Drivers.phoneNumber, Drivers.truckNumber, Drivers.employed, Drivers.summaryNote, Loads.driverID, Loads.puDate, Loads.puTime, Loads.endPUTime, Loads.delDate, Loads.delTime, Loads.endDelTime, Loads.broker, Loads.notes FROM Drivers
    INNER JOIN Loads ON Drivers.id = Loads.driverID
    WHERE driverID = ${req.params.driverID} AND Loads.booked
    ORDER BY puDate DESC
    LIMIT 1;`, (err, rows) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({loads: rows});
        }
    });
});


app.get('/drivers/:driverID/bookedLoads/:year/:month', (req,res) => {
    db.query(`SELECT * FROM Loads WHERE driverID = ${req.params.driverID} AND booked = true AND delDate LIKE '${req.params.month}____${req.params.year}' 
    ORDER BY puDate DESC;`, (err, rows) => {
        if(err){
            throw err;
        } else {
            res.json({loads: rows});
        }
    });
});

app.get('/drivers/:driverID/bookedLoads/:year', (req,res) => {
    db.query(`SELECT * FROM Loads WHERE driverID = ${req.params.driverID} AND booked = true AND delDate LIKE '______${req.params.year}' 
    ORDER BY puDate DESC;`, (err, rows) => {
        if(err){
            throw err;
        } else {
            res.json({loads: rows});
        }
    });
});

app.get('/loadsForCalendar/:year/:month', (req,res) => {
    db.query(`SELECT Drivers.firstName, Loads.puCity, Loads.puDate, Loads.puTime, Loads.endPUTime, Loads.delCity, Loads.delDate, Loads.delTime, Loads.endDelTime, Loads.loadStatus, Loads.dispatched
                FROM Drivers 
                INNER JOIN Loads
                ON Drivers.id = Loads.driverID
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
    db.query(`SELECT * FROM Loads WHERE driverID = 1 AND booked = true;`, (err, rows) => {
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
    if(!newLoad.driverID  || !newLoad.puCity ||!newLoad.puState || !newLoad.puDate || !newLoad.puTime || !newLoad.delCity || !newLoad.delState
        || !newLoad.delDate || !newLoad.delTime || !newLoad.commodity || !newLoad.weight || !newLoad.broker || !newLoad.rate || !newLoad.trailerType) {
            res.sendStatus(400);
        } else{
            db.query(`INSERT INTO Loads SET ?;`, {
                            loadID: newLoad.loadID,
                            driverID: newLoad.driverID,
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
    if(!updatedLoad.driverID  || !updatedLoad.puCity ||!updatedLoad.puState || !updatedLoad.puDate || !updatedLoad.puTime || !updatedLoad.delCity || !updatedLoad.delState
        || !updatedLoad.delDate || !updatedLoad.delTime || !updatedLoad.commodity || !updatedLoad.weight || !updatedLoad.broker || !updatedLoad.rate || !updatedLoad.trailerType){
            res.sendStatus(400);
        } else{
            db.query(`UPDATE Loads SET ? WHERE id = ${req.params.loadID};`, {
                            loadID: updatedLoad.loadID,
                            driverID: updatedLoad.driverID,
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
    db.query(`SELECT ROUND(AVG(rate), 0) AS "averageRate" FROM Loads WHERE booked = 1;`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({average: row});
        }
    });
});

//Year Average for all loads, Doesn't take releodLoad in SQL Query
app.get('/bookedRateAverage/:year/2', (req,res) => {
    db.query(`SELECT ROUND(AVG(rate), 0) AS "averageRate", COUNT(*) AS numberOfLoads FROM Loads
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
    db.query(`SELECT ROUND(AVG(rate), 0) AS "averageRate", COUNT(*) AS numberOfLoads FROM Loads
    WHERE booked = 1 AND delDate LIKE '______${req.params.year}' AND reloadLoad = ${req.params.reloadLoad};`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({average: row});
        }
    });
});

//Year Average for all loads for SPECIFIC DRIVER, Doesn't take releodLoad in SQL Query
app.get('/bookedRateAverage/:year/2/driver/:driverID', (req,res) => {
    db.query(`SELECT ROUND(AVG(rate), 0) AS "averageRate", COUNT(*) AS numberOfLoads FROM Loads
    WHERE booked = 1 AND delDate LIKE '______${req.params.year}' AND driverID = ${req.params.driverID};`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({average: row});
        }
    });
});

//Year Average for either reload or orignal loads for SPECIFIC DRIVER
app.get('/bookedRateAverage/:year/:reloadLoad/driver/:driverID', (req, res) => {
    db.query(`SELECT ROUND(AVG(rate), 0) AS "averageRate", COUNT(*) AS numberOfLoads FROM Loads
    WHERE booked = 1 AND delDate LIKE '______${req.params.year}' AND reloadLoad = ${req.params.reloadLoad} AND driverID = ${req.params.driverID};`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({average: row});
        }
    });
});

//Month Average for all loads, Doesn't take reloadLoad in SQL Query
app.get('/bookedRateAverage/:year/:month/2', (req,res) => {
        db.query(`SELECT ROUND(AVG(rate), 0) AS "averageRate", COUNT(*) AS numberOfLoads FROM Loads
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
    db.query(`SELECT ROUND(AVG(rate), 0) AS "averageRate", COUNT(*) AS numberOfLoads FROM Loads
    WHERE booked = 1 AND delDate LIKE '${req.params.month}____${req.params.year}' AND reloadLoad = ${req.params.reloadLoad};`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({average: row});
        }
    });
});

//Month Average for all loads FOR SPECIFIC DRIVER, Doesn't take reloadLoad in SQL Query
app.get('/bookedRateAverage/:year/:month/2/driver/:driverID', (req,res) => {
        db.query(`SELECT ROUND(AVG(rate), 0) AS "averageRate", COUNT(*) AS numberOfLoads FROM Loads
    WHERE booked = 1 AND delDate LIKE '${req.params.month}____${req.params.year}' AND driverID = ${req.params.driverID};`, (err, row) => {
            if(err){
                throw err;
            } else{
                res.status(200).json({average: row});
            }
        });
});

//Month Average for either reload or orignal loads FOR SPECIFIC DRIVER
app.get('/bookedRateAverage/:year/:month/:reloadLoad/driver/:driverID', (req, res) => {
    db.query(`SELECT ROUND(AVG(rate), 0) AS "averageRate", COUNT(*) AS numberOfLoads FROM Loads
    WHERE booked = 1 AND delDate LIKE '${req.params.month}____${req.params.year}' AND reloadLoad = ${req.params.reloadLoad} AND driverID = ${req.params.driverID};`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({average: row});
        }
    });
});

//SUMS

//Year Sum for all loads, Doesn't take releodLoad in SQL Query
app.get('/bookedRateSum/:year/2', (req,res) => {
    db.query(`SELECT SUM(rate) AS "sumRate", COUNT(*) AS numberOfLoads FROM Loads
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
    db.query(`SELECT SUM(rate) AS "sumRate", COUNT(*) AS numberOfLoads FROM Loads
    WHERE booked = 1 AND delDate LIKE '______${req.params.year}' AND reloadLoad = ${req.params.reloadLoad};`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({sum: row});
        }
    });
});

//Year Sum for all loads for SPECIFIC DRIVER, Doesn't take releodLoad in SQL Query
app.get('/bookedRateSum/:year/2/driver/:driverID', (req,res) => {
    db.query(`SELECT SUM(rate) AS "sumRate", COUNT(*) AS numberOfLoads FROM Loads
    WHERE booked = 1 AND delDate LIKE '______${req.params.year}' AND driverID = ${req.params.driverID};`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({sum: row});
        }
    });
});

//Year Sum for either reload or orignal loads FOR SPECIFIC DRIVER
app.get('/bookedRateSum/:year/:reloadLoad/driver/:driverID', (req, res) => {
    db.query(`SELECT SUM(rate) AS "sumRate", COUNT(*) AS numberOfLoads FROM Loads
    WHERE booked = 1 AND delDate LIKE '______${req.params.year}' AND reloadLoad = ${req.params.reloadLoad} AND driverID = ${req.params.driverID};`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({sum: row});
        }
    });
});

//Month Sum for all loads, Doesn't take releodLoad in SQL Query
app.get('/bookedRateSum/:year/:month/2', (req,res) => {
    db.query(`SELECT SUM(rate) AS "sumRate", COUNT(*) AS numberOfLoads FROM Loads
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
    db.query(`SELECT SUM(rate) AS "sumRate", COUNT(*) AS numberOfLoads FROM Loads
    WHERE booked = 1 AND delDate LIKE '${req.params.month}____${req.params.year}' AND reloadLoad = ${req.params.reloadLoad};`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({sum: row});
        }
    });
});

//Month Sum for all loads for SPECIFIC DRIVER, Doesn't take releodLoad in SQL Query
app.get('/bookedRateSum/:year/:month/2/driver/:driverID', (req,res) => {
    db.query(`SELECT SUM(rate) AS "sumRate", COUNT(*) AS numberOfLoads FROM Loads
WHERE booked = 1 AND delDate LIKE '${req.params.month}____${req.params.year}' AND driverID = ${req.params.driverID};`, (err, row) => {
        if(err){
            throw err;
        } else{
            res.status(200).json({sum: row});
        }
    });
});

//Month Sum for either reload or orignal loads for SPECIFIC DRIVER
app.get('/bookedRateSum/:year/:month/:reloadLoad/driver/:driverID', (req, res) => {
    db.query(`SELECT SUM(rate) AS "sumRate", COUNT(*) AS numberOfLoads FROM Loads
    WHERE booked = 1 AND delDate LIKE '${req.params.month}____${req.params.year}' AND reloadLoad = ${req.params.reloadLoad} AND driverID = ${req.params.driverID};`, (err, row) => {
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


