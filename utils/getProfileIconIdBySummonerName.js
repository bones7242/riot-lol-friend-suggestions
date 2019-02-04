const logger = require('winston');
const getSummonerByName = require('./getSummonerByName.js');

module.exports = (summonerName, region) => {
	return getSummonerByName(summonerName, region)
	.then(summonerData => {
		const profileIcon = summonerData.profileIconId;
		logger.debug('profile icon id:', profileIcon);
		return profileIcon;
	})
	.catch(error => {
		// logger.error(error);
		throw error;
	})
	
}