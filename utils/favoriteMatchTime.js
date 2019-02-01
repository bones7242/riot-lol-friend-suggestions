const logger = require('winston');

module.exports = (matchList) => {
	let matchTimes = [];
	for (let i = 0; i < matchList.length; i++) {
		const timestamp = matchList[i].timestamp;

		const date = new Date(timestamp*1000);
		// Hours part from the timestamp
		const hours = date.getHours();
		// Minutes part from the timestamp
		const minutes = "0" + date.getMinutes();
		// Seconds part from the timestamp
		const seconds = "0" + date.getSeconds();

		// Will display time in 10:30:23 format
		const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

		matchTimes.push(formattedTime);
		
	}
	logger.info('your match times :', matchTimes);
	return;
}