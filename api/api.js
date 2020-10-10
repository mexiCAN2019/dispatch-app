const express = require('express');
const apiRouter = express.Router();



const driversRouter = require('./drivers')
apiRouter.use('/drivers', driversRouter);

const loadsRouter = require('./allLoads')
apiRouter.use('/loads', loadsRouter);


module.exports = apiRouter;