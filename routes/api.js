const logger = require('winston');
const suggestFriends = require('../utils/suggestFriends.js');

module.exports = app => {  
  	app.get('/friends-suggestions/:region/:summonerName', (req, res) => {
    	const { region, summonerName } = req.params;
		suggestFriends(summonerName, region)
		.then(suggestions =>  {
			res.status(200).json({ 
				'message': 'friend suggestions successfully found',
				'data': suggestions, 
			})
		})
		.catch(error => {
			logger.error(error);  // log the result
			res.status(500).json({ 
				'message': 'sorry we had an internal error',
				'data': null,
			})
		});
	});
};
