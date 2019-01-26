import React, { Component } from 'react';
import WidgetDynamicTitle from 'components/sumWidget/WidgetDynamicTitle';
import NumInput from 'components/formElements/NumInput';
import * as CONSTANTS from 'utils/constants';
import ObjectUtils from 'utils/objectUtils';
import FormUtils from 'utils/formUtils';
import styles from 'components/sumWidget/SumWidgetContainer.module.css';

let { FIELDS, FIELD_TEMPLATE} = CONSTANTS.appConstants;
let { FORM_INTRO, NUM_ERROR } = CONSTANTS.formConstants;

export default class SumWidgetContainer extends Component {
	state = { fields: null, sum: null, error: null };

	static getDerivedStateFromProps(nProps, state) {
		if ( !state.fields) return SumWidgetContainer.setInitialState();
		return state;
	}

	static setInitialState() {
		// gets Field Values
		let fields = SumWidgetContainer.getFieldValues();
		// gets InitialSum
		let sum = 0;
		return { fields, sum};
	}

	static getFieldValues() { console.log('getdre');
		let fields = {};
		let addField = (i) => fields[i] = FIELD_TEMPLATE;

		ObjectUtils.iterateOverNumber(FIELDS, i => addField(i));

		return { ...fields };
	}

	handleInputChange = ({target: {name, value}, ...e}) => {
		let error;
		// remove empty spaces and  numeric format
		value = FormUtils.clearInputValue(value);
		if(!FormUtils.validateNumber(value)) error = true;
		this.setNewValue(name, value, error);
	};

	handleInputClick = ({target: {name, value}, ...e}) => { console.log('click');
		if (value === '0') value = '';
		this.setNewValue(name, value);
	};

	setNewValue = (name, value, error) => {
		let newField = Object.assign({}, this.state.fields[name], { value, error: error });
		this.setState({
			error: error ? NUM_ERROR : null,
			fields: { ...this.state.fields, [name]: newField },
		});
	};

	renderInputFields = () => {
		let inputFields = [];
		let addInput = i => {
			let { value, error } = this.state.fields[i];
			value = FormUtils.formatNumericValue(value);
			inputFields.push(
				<li key={i}>
					<NumInput name={i}
					          value={value}
					          error={error}
					          onChange={this.handleInputChange}
					          onClick={this.handleInputClick} />
				</li> );
		};

		ObjectUtils.iterateOverNumber(FIELDS, i => addInput(i));
		return inputFields;
	};

	render() {
		let { error } = this.state;
		return (
			<section className={styles.container}>
				<WidgetDynamicTitle title={error?  error : FORM_INTRO } />
				<ul className={styles.list}>
					{this.renderInputFields()}
					<li>Total</li>
				</ul>
			</section>
		);
	}
}