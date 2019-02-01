// load dependencies
const logger = require('winston');
const axios = require('axios');
const apiKey = require('../config/config.js').api.key;

module.exports = (matchId, region) => {
	const matchQuery = `https://${region}.api.riotgames.com/lol/match/v4/matches/${matchId}?api_key=${apiKey}`;
	return axios
	.get(matchQuery)
	.then(response => {
		// logger.debug('match data:', response.data);
		return response.data;
	})
	.catch(error => {
		logger.error({
		message: error.message, 
		stack: error.stack
		});
	});
};
