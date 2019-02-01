const logger = require('winston');
const getMatchParticipantsByMatchId = require('./getMatchParticipantsByMatchId.js');
const getMatchesBySummonerName = require('./getmatchesBySummonerName.js');

const matchLimit = require('../config/config.js').matchLimit || 100;

const createSortedFriendsArray = (friendshipMap) => {
	// turn map into an array
	let friendsList = [];
	for (key in friendshipMap) {
		if (friendshipMap.hasOwnProperty(key)) {
			friendsList.push({
					name: key, 
					score: friendshipMap[key]
				})
		}
	}
	// sort the array
	friendsList.sort((a, b) => {
		return b.score - a.score;
	  });
	// return the sorted array
	logger.debug('friendsList', friendsList);
	return friendsList;
}

const createFriendshipMap = (summonerName, matchParticpantsArray) => {
	// create a map of summoners with friendship scores
	// input to this function is a list of matches, each with a list of summoners with their relevant data for the match
	let friendshipMap = {};
	for (let i = 0; i < matchParticpantsArray.length; i++) { 
		const summonersList = matchParticpantsArray[i]; // each element is one game's worth of summoners
		logger.debug('summoner list', summonersList);
		// figure out my team and if I won
		let myTeam;
		let iWon = false;
		for (let key in summonersList) { // find myself in the game's summoners
			const summoner = summonersList[key];
			if (summoner.name === summonerName) {
				myTeam = summoner.team;
				iWon = summoner.win;
			}
		}
		// add data to the map for the rest of the crew
		for (let key in summonersList) { 
			const summoner = summonersList[key]; // each element is a summoner
			const { name, team, win } = summoner
			if (name !== summonerName) { // skip myself
				// assign a =/- score to the friendship (like counting cards in blackjack)
				// note: add some sort of tiebreaker, like maybe a multiple based on how long ago the match was
				let friendScore = 1;
				if (team === myTeam) {
					friendScore +=1;
					if (win) {
						friendScore +=2;
					}
				}
				// add it to the map
				if (friendshipMap[name]) {
					friendshipMap[name] += friendScore;
					
				} else {
					friendshipMap[name] = friendScore;
				}
			}
			
		}
		
	}
	logger.debug('friendshipMap', friendshipMap);
	return friendshipMap;
}

const returnTopFriendsNames = (sortedFriendsArray) => {
	// slice the arr
	const topTenFriends = sortedFriendsArray.slice(0, 9);
	const friendsNames = topTenFriends.map(friend => {
		return friend.name;
	})
	logger.debug('friendsNames', friendsNames);
	return friendsNames;
}

module.exports = (summonerName, region) => {
	return getMatchesBySummonerName(summonerName, region)
	.then(matchList => {
		// filter matchList b/c rate limiting
		let reducedMatchList = [];
		for (let i = 0; i < matchLimit; i++) {
			reducedMatchList.push(matchList[i])
		}
		//make a set of match requests, one for each match
		return Promise.all(reducedMatchList.map(match => {
			return getMatchParticipantsByMatchId(match.gameId, region);
		}));
	})
	.then(particpantsArray => {
		const friendshipMap = createFriendshipMap(summonerName, particpantsArray);
		const sortedFriendslist = createSortedFriendsArray(friendshipMap);
		const topFriends = returnTopFriendsNames(sortedFriendslist);
		logger.info('Suggested friends:', topFriends);
	})
	.catch(error => {
		logger.error(error);
	})
	
}