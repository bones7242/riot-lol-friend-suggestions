// load dependencies
const logger = require('winston');
const axios = require('axios');
const apiKey = process.env.RIOT_KEY || require('../config/api-key.js');

module.exports = (matchId, region) => {
	const matchQuery = `https://${region}.api.riotgames.com/lol/match/v4/matches/${matchId}?api_key=${apiKey}`;
	return axios
	.get(matchQuery)
	.then(response => {
		// logger.debug('match data:', response.data);
		return response.data;
	})
	.catch(error => {
		// logger.error({
		// message: error.message, 
		// stack: error.stack
		// });
		throw error;
	});
};
