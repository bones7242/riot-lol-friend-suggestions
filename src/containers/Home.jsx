import React from 'react';
import FriendSuggestion from './FriendSuggestion.jsx';

const READY = 'READY';
const THINKING = 'THINKING';

class Home extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			summonerName: '',
			region: 'na1',
			names: null,
			error: null,
			status: READY, // THINKING
		}
		// bind class methods with `this`
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	getFriendSuggestions (region, summonerName) {
		const that = this;
		// make request
		var xhr = new XMLHttpRequest();
		xhr.open('GET', `/friends-suggestions/${region}/${summonerName}`);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.addEventListener('readystatechange', function () {
		  if (this.readyState === 4) {
			// set form status
			that.setState({
				status: READY,
			})
			// display result
			if (this.status === 200) {
				const response = JSON.parse(this.response);
				console.log('200 response', response);
				that.setState({
					names: response.data,
					error: null,
				});
			} else {
				if (this.status === 404) {
					that.setState({
						names: null,
						error: 'no summoner was found',
					});
				} else {
					const response = JSON.parse(this.response);
					that.setState({
						names: null,
						error: response.message,
					});
				}
			}
		  }
		});
		xhr.send();
	}
	handleInput (e) {
		e.preventDefault();
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value});
	}
	handleSubmit (e) {
		e.preventDefault();
		this.setState({
			status: THINKING,
			error: null,
			names: null,
		})
		this.getFriendSuggestions(this.state.region, this.state.summonerName);
	}
	render () {
		return (
			<div id="home-screen" className="flex-container flex-container--column flex-container--center-center">
				<div id="small-screen" className="card">
					<div className="card--title">
						<h4>LoL Friend Finder v0.0.1</h4>
					</div>
					<div className="card--body">
						<h4>SEARCH</h4>
						{
							this.state.names && (
								<div>
									<h4>Friend Suggestions:</h4>
									<ul>
										{this.state.names.map((name, index) => {
											return <FriendSuggestion key={ index } region={this.state.region} summonerName={name}/>;
										})}
									</ul>
								</div>
							)
						}
						{ this.state.status === READY ? (
							<div>
								{ this.state.error ? (
									<p style={{color: 'red'}}>{this.state.error}</p>
								) : (
									<p>Search your summoner name to get friend suggestions</p>
								)}
								<form onSubmit={this.handleSubmit}>
									<div className="form-group">
										<label htmlFor="summonerName">Summoner Name</label>
										<input type="text" className="form-control" name="summonerName" value={this.state.summonerName} onChange={this.handleInput}/>
									</div>
									<div className="form-group">
										<label htmlFor="region">Region</label>
										<input type="text" className="form-control"  name="region" value={this.state.region} onChange={this.handleInput}/>
									</div>
									<p>Note: no information is stored on our server, we simply make a call to riot's apis, do some processing, and return the result.</p>
									<button type="submit" className="btn btn-primary">submit</button>
								</form>
							</div>
						) : (
							<p> processing...</p>
						)}
					</div>
					<div className="card--footer">
						<a href="https://github.com/billbitt/riot-lol-friend-suggestions" target="_blank">Github</a>
						<p>LoL Friend Finder isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.</p>
					</div>
				</div>
				
			</div>
		);
	}
}

module.exports = Home;
