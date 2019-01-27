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
	state = { fields: null, sum: null, error: null, fieldsNumber: FIELDS };

	static getDerivedStateFromProps(nProps, state) {
		if ( !state.fields) return SumWidgetContainer.setInitialState(state.fieldsNumber);
		return state;
	}

	static setInitialState(num) {
		// gets Field Values
		let fields = SumWidgetContainer.getFieldValues(num);
		// gets InitialSum
		let sum = 0;
		return { fields, sum};
	}

	static getFieldValues(num) {
		let fields = {};
		let addField = (i) => fields[i] = FIELD_TEMPLATE;

		ObjectUtils.iterateOverNumber(num, i => addField(i));

		return { ...fields };
	}

	handleInputChange = ({target: {name, value}, ...e}) => {
		// remove empty spaces and  numeric format
		value = FormUtils.clearInputValue(value);
		//validate and set
		if(!FormUtils.validateNumber(value)) this.handleInputError(name);
		else this.setNewValue(name, parseInt(value));
	};

	handleInputClick = ({target: {name, value}, ...e}) => { console.log('click');
		if (value === '0') value = '';
		this.setNewValue(name, value);
	};

	handleInputError = (name) => {
		this.setNewValue(name, 0, true);
	};

	setNewValue = (name, value, error) => {
		console.log('value', value);
		let newField = Object.assign({}, this.state.fields[name], { value, error: error });
		this.setState({
			error: error ? NUM_ERROR : null,
			fields: { ...this.state.fields, [name]: newField },
		});
	};

	renderInputFields = () => {
		let { fields, fieldsNumber } = this.state;
		let inputFields = [];
		let addInput = i => {
			let { value, error } = fields[i];
			value = FormUtils.formatNumericValue(value);
			inputFields.push(
				<li key={i}>
					<NumInput name={i}
					          data-test={`input-${i}`}
					          value={value}
					          error={error}
					          onChange={this.handleInputChange}
					          onClick={this.handleInputClick} />
				</li> );
		};

		ObjectUtils.iterateOverNumber(fieldsNumber, i => addInput(i));
		return inputFields;
	};

	render() {
		let { error } = this.state;
		return (
			<section className={styles.container} data-test="sum_widget_container">
				<WidgetDynamicTitle title={error?  error : FORM_INTRO } />
				<ul className={styles.list}>
					{this.renderInputFields()}
					<li>Total</li>
				</ul>
			</section>
		);
	}
}