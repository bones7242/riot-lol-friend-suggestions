const logger = require('winston');
const Champion = require('../data/champion.json');
const getMatchesBySummonerName = require('./getmatchesBySummonerName.js');

const createChampionKeySet = () => {
	const championData = Champion.data;
	const championKeySet = {};
	for (var key in championData) {
		if (championData.hasOwnProperty(key)) {
			const championName = key;
			const championId = championData[key].key;
			championKeySet[championId] = championName;
		}
	}
	return championKeySet;
}

module.exports = (summonerName, region) => {
	return getMatchesBySummonerName(summonerName, region)
	.then(matchList => {
		const championKeySet = createChampionKeySet();
		let championsHashMap = {};
		for (let i = 0; i < matchList.length; i++) {
			const championKey = matchList[i].champion;
			const championName = championKeySet[championKey];
			if (championsHashMap[championName]) {
				championsHashMap[championName] += 1;
			} else {
				championsHashMap[championName] = 1;
			}
			
		}
		logger.debug('champions hash map =', championsHashMap);
		favoriteChampion = Object.keys(championsHashMap).reduce((a, b) => championsHashMap[a] > championsHashMap[b] ? a : b);
		logger.info('your favorite champion is:', favoriteChampion);
	})
	.catch(error => {
		logger.error(error);
	})
	
}