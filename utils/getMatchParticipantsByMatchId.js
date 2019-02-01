// load dependencies
const logger = require('winston');
const getMatchById = require('./getMatchById.js');
const apiKey = require('../config/config.js').api.key;

getParticipantdata = (matchData) => {
	const { participants, participantIdentities } = matchData;
	let players = {};
	// go through the participants and get relevant info
	for (let i = 0; i < participants.length; i++) {
		const participant = participants[i];
		let playerInfo = {};
		playerInfo['teamId'] = participant.teamId;
		playerInfo['win'] = participant.stats.win;
		playerInfo['name'] = participantIdentities[i].player.summonerName;
		// add to players object
		players[participant.participantId] = playerInfo;
	}
	return players;
}

module.exports = (matchId, region) => {
	return getMatchById(matchId, region)
	.then(matchData => {
		return getParticipantdata(matchData);
	})
	.catch(error => {
		logger.error({
		message: error.message, 
		stack: error.stack
		});
	});
};
