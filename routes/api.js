const logger = require('winston');
const suggestFriends = require('../utils/suggestFriends.js');
const getProfileIconIdBySummonerName = require('../utils/getProfileIconIdBySummonerName.js');

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

const handleError = (error, res) => {
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
}

const validateParams = (region, summonerName, res) => {
	// cleanse region
	if (isRegionNotValid(region)){
		res.status(400).json({ 
			'message': 'invalid region',
		})
		return;
	}
	if (isSummonerNotValid(summonerName)){
		res.status(400).json({ 
			'message': 'invalid summoner name',
		})
		return;
	}
}

module.exports = app => {  
  	app.get('/friends-suggestions/:region/:summonerName', (req, res) => {
		const { region, summonerName } = req.params;
		// validate params
		if (isRegionNotValid(region)){
			res.status(400).json({ 
				'message': 'invalid region',
			})
			return;
		}
		if (isSummonerNotValid(summonerName)){
			res.status(400).json({ 
				'message': 'invalid summoner name',
			})
			return;
		}
		// proceed
		suggestFriends(summonerName, region)
		.then(suggestions =>  {
			res.status(200).json({ 
				'message': 'friend suggestions successfully found',
				'data': suggestions, 
			})
		})
		.catch(error => {
			handleError(error, res);
		});
	});
	app.get('/profile-icon/:region/:summonerName', (req, res) => {
		const { region, summonerName } = req.params;
		// validate params
		if (isRegionNotValid(region)){
			res.status(400).json({ 
				'message': 'invalid region',
			})
			return;
		}
		if (isSummonerNotValid(summonerName)){
			res.status(400).json({ 
				'message': 'invalid summoner name',
			})
			return;
		}
		// proceed
		getProfileIconIdBySummonerName(summonerName, region)
		.then(profileIconId =>  {
			res.status(200).json({ 
				'message': `profile icon successfully found for ${summonerName}`,
				'data': profileIconId, 
			})
		})
		.catch(error => {
			handleError(error, res);
		});
	});
};
