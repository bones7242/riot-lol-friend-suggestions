import React from 'react';

class FriendSuggestion extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			profileIconId: 0,
			error: null,
		}
		this.getProfileIconId = this.getProfileIconId.bind(this);
	}
	componentDidMount () {
		this.getProfileIconId(this.props.region, this.props.summonerName);
	}
	getProfileIconId (region, summonerName) {
		const that = this;
		// make request
		var xhr = new XMLHttpRequest();
		xhr.open('GET', `/profile-icon/${region}/${summonerName}`);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.addEventListener('readystatechange', function () {
		  if (this.readyState === 4) {
			// display result
			if (this.status === 200) {
				const response = JSON.parse(this.response);
				console.log('200 response', response);
				that.setState({
					profileIconId: response.data,
					error: null,
				});
			} else {
				if (this.status === 404) {
					that.setState({
						profileIconId: 0,
						error: 'no summoner was found',
					});
				} else {
					const response = JSON.parse(this.response);
					that.setState({
						profileIconId: 0,
						error: response.message,
					});
				}
			}
		  }
		});
		xhr.send();
	}
	render () {
		return (
			<div className='friend-suggestion'>
				<img 
					src={`http://ddragon.leagueoflegends.com/cdn/9.2.1/img/profileicon/${this.state.profileIconId}.png`}
					className='friend-suggestion--icon'
				/>
				<p>{this.props.summonerName}</p>
			</div>
		);
	}
}

module.exports = FriendSuggestion;
