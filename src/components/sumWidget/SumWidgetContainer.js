import React, { Component } from 'react';
import WidgetDynamicTitle from 'components/sumWidget/WidgetDynamicTitle';
import NumInput from 'components/formElements/NumInput';
import * as CONSTANTS from 'utils/constants';
import styles from 'components/sumWidget/SumWidgetContainer.module.css';

let { FIELDS, FIELD_TEMPLATE} = CONSTANTS.app;

export default class SumWidgetContainer extends Component {
	state = { fields: null, sum: null };

	static getDerivedStateFromProps(nProps, state) {
		if ( !state.fields) return SumWidgetContainer.setInitialState();
		return null;
	}

	static setInitialState() {
		// gets Field Values
		let fields = SumWidgetContainer.getFieldValues();
		// gets InitialSum
		let sum = 0
		return { fields, sum};
	}

	static getFieldValues() {
		let fields = {};
		for ( let i of Array(FIELDS).keys() ) {
			fields[i] = FIELD_TEMPLATE;
		}

		return { ...fields };
	}

	handleInputChange = ({target: {name, value}, ...e}) => {
		let newField = Object.assign({}, this.state.fields[name], { value });
		this.setState({
			fields: { ...this.state.fields, [name]: newField },
		});
	};

	renderInputFields = () => {
		let inputFields = [];

		for ( let i of Array(FIELDS).keys() ) {
			let { value, error } = this.state.fields[i];
			inputFields.push(
				<li key={i}>
					<NumInput name={i}
					          value={value}
					          error={error}
					          onChange={this.handleInputChange} />
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