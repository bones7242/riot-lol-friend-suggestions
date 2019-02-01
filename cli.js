// load dependencies
const config = require('./config/config.js');
const logger = require('winston');
const favoriteChampion = require('./utils/favoriteChampion.js');
const suggestFriends = require('./utils/suggestFriends.js');

// get variables
const command = process.argv[2];
const summonerName = process.argv[3];
const region = process.argv[4] || 'na1';

// configure logging
const logLevel = process.argv[5] || config.logging.level || 'info';
require('./logging/loggerSetup.js')(logger, logLevel);

logger.debug('command =', command);
logger.debug('summoner name =', summonerName);
logger.debug('region =', region);

switch (command) {
  case 'favorite_champion':
      favoriteChampion(summonerName, region);
    break;
  case 'suggest_friends':
      suggestFriends(summonerName, region);
    break;
  default:
    break;
}