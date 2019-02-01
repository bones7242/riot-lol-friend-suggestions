const logger = require('winston');
const suggestFriends = require('../utils/suggestFriends.js');

const isRegionNotValid = region => {
	switch (region) {
		case 'br1':	
		case 'eun1':	
		case 'euw1':	
		case 'jp1':	
		case 'la1':
		case 'la2':
		case 'na1':
		case 'oc1':
		case 'tr1':
		case 'ru':
		case 'pbe1':
			return false;
		default:
		 	return true;
	}
}

const isSummonerNotValid = summoner => {
  const regex = /[^A-Za-z0-9._\ ]+/g;
  return regex.exec(summoner)
}

module.exports = app => {  
  	app.get('/friends-suggestions/:region/:summonerName', (req, res) => {
		
		const { region, summonerName } = req.params;
		// cleanse region
		if (isRegionNotValid(region)){
			res.status(400).json({ 
				'message': 'invalid region',
			})
		}
		if (isSummonerNotValid(summonerName)){
			res.status(400).json({ 
				'message': 'invalid summoner name',
			})
		}
		// filter summoner name
		// proceed
		suggestFriends(summonerName, region)
		.then(suggestions =>  {
			res.status(200).json({ 
				'message': 'friend suggestions successfully found',
				'data': suggestions, 
			})
		})
		.catch(error => {
			// logger.error(error);  // log the result
			if (error.response) {
				if (error.response.status === 403) {
					res.status(403).json({
						message: 'server API key likely invalid'
					});
				} else if (error.response.status === 404) {
					res.status(404).json({
						message: 'No summoner found'
					});
				}
				return;
			}

			res.status(500).json({ 
				'message': 'sorry we had an internal error',
				'data': null,
			})
		});
	});
};
