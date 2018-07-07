import React, { Component } from 'react';
import fire from './config/fire';

class Home extends Component {
	constructor(props){
		super(props);
		this.logout = this.logout.bind(this);
	}

	logout() {
		fire.auth().signOut();

		// remove all query params to help reset auth state
		window.history.pushState({}, document.title, "/" + "localhost:3000");
	}

	render() {
		return (
			<div className="col-md-6">
				<h1>2928 foo</h1>
				<button onClick={this.logout} className="btn btn-primary">Logout</button>
			</div>
		);
	}
}

export default Home;