// load dependencies
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config.js');
const logger = require('winston');

// configure logging
const logLevel = config.logging.logLevel || 'debug';
require('./logging/loggerSetup.js')(logger, logLevel);

// set port
const PORT = process.env.PORT || 3000;

// initialize express app
const app = express();

// make express look in the public directory for assets (css/js/img)
app.use(express.static(`${__dirname}/public`));

// configure express app
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// log the requests as they come in
const myRequestLoggingMiddleware = function ({ ip, originalUrl }, res, next) {
  logger.verbose(`request on ${originalUrl} from ${ip}`);
  next();
};
app.use(myRequestLoggingMiddleware);

// require express routes
require('./routes/api.js')(app);


app.listen(PORT, () => {
    logger.info(`Server is listening on PORT ${PORT}`);
  })
