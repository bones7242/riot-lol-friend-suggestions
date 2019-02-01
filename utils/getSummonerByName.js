// load dependencies
const logger = require('winston');
const axios = require('axios');
const apiKey = process.env.RIOT_KEY || require('../config/api-key.js');

module.exports = (summonerName, region) => {
	const summonerQuery = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`;
	return axios
	.get(summonerQuery)
	.then(response => {
		logger.debug('summoner data:', response.data);
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
