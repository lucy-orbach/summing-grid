import React, { Component } from 'react';
import WidgetDynamicTitle from 'components/sumWidget/WidgetDynamicTitle';
import NumInput from 'components/formElements/NumInput';
import * as CONSTANTS from 'utils/constants';
import styles from 'components/sumWidget/SumWidgetContainer.module.css';

let { FIELDS } = CONSTANTS.app;

export default class SumWidgetContainer extends Component {

	handleInputChange = () => {
		console.log('handleInputchange');
	};

	renderInputFields = () => {
		let inputFields = [];
		for ( let i of Array(FIELDS).keys() ) {
			inputFields.push(
				<li key={i}>
					<NumInput value={i} error={""} onChange={this.handleInputChange} />
				</li>
			);
		}
		return inputFields;
	};

	render() {
		console.log(this.state);
		return (
			<section className={styles.container}>
				<WidgetDynamicTitle title={"hi"} />
				<ul className={styles.list}>
					{this.renderInputFields()}
					<li>Total</li>
				</ul>
			</section>
		);
	}
}