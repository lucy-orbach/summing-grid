import React, { Component } from 'react';

export default class ErrorBoundary extends React.Component {
	state = { error: null };

	static getDerivedStateFromError(error) {
		return { error: error };
	}

	render() {
		let { error } = this.state;
		if ( error ) return (
			<React.Fragment>
				<h2>Oops! Something when wrong :(</h2>
				<h3>{ error} </h3>
			</React.Fragment>
		);

		return this.props.children;
	}
}