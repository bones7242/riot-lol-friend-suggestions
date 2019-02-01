// load dependencies
const logger = require('winston');
const axios = require('axios');
const apiKey = process.env.RIOT_KEY || require('../config/api-key.js');
const getSummonerByName = require('./getSummonerByName.js');

module.exports = (summonerName, region) => {
	return getSummonerByName(summonerName, region)
	.then(summoner => {
	    const encryptedAccountId = summoner.accountId
		logger.debug('encrypted account id', encryptedAccountId);
		const matchlistsQuery = `https://${region}.api.riotgames.com/lol/match/v4/matchlists/by-account/${encryptedAccountId}?api_key=${apiKey}`
		return axios.get(matchlistsQuery);
	})
	.then(response => {
		logger.debug('match lists data:', response.data);
		return response.data.matches;
	})
	.then(matchesArray => {
		logger.debug('matches array:', matchesArray);
		return matchesArray;
	})
	.catch(error => {
		// logger.error({
		// message: error.message, 
		// stack: error.stack
		// });
		throw error;
	});
};
