// load dependencies
const logger = require('winston');
const axios = require('axios');
const apiKey = require('../config/config.js').api.key;
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
		logger.error({
		message: error.message, 
		stack: error.stack
		});
	});
};
