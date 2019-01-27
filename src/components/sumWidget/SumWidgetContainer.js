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
	state = { fields: null, sum: 0, fieldsNumber: this.props.fieldsNumber || FIELDS };

	static getDerivedStateFromProps(nProps, nState) {
		if ( !nState.fields ) return SumWidgetContainer.setInitialState(nState.fieldsNumber);
		return nState;
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
		if(!FormUtils.validateNumber(value)) this.setNewValue(name, value, true);
		else this.setNewValue(name, value);
	};

	handleInputClick = ({target: {name, value}, ...e}) => {
		// if value is 0 -> clear up input
		if (value === '0') value = '';
		this.setNewValue(name, value);
	};

	setNewValue = (name, value, error) => {
		let newField = Object.assign({}, this.state.fields[name], { value, error: error });
		this.setState({
			fields: { ...this.state.fields, [name]: newField },
		}, () => {
			if (value) this.updateSum();
		});
	};

	updateSum = () => {
		// sums fields
		let { fields, sum } = this.state;
		sum = Object.values(fields).reduce((a,b) => {
			// if value is null or has an error calculate as zero
			let newValue = b.value && !b.error  ? parseFloat(b.value) : 0;
			return a + newValue;
		}, 0);

		this.setState({sum});
	};

	validateErrors = () => {
		// verify all values are valid
		let { fields } = this.state;
		for (let i in fields) {
			if (fields[i].error) return true;
		}

		return false;
	};

	renderInputFields = () => {
		// adds an input field according to the number of fieldsNumber
		let { fields, fieldsNumber } = this.state;
		let inputFields = [];
		let addInput = i => {
			let { value, error } = fields[i];
			value = FormUtils.formatNumericValue(value);
			inputFields.push(
				<li key={i} className={error ? styles.cell_error : styles.cell}>
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
		let {  sum } = this.state;
		let total = FormUtils.formatToNearestValue(sum);
		let hasError = this.validateErrors();

		return (
				<section className={styles.container} data-test="sum_widget_container">
					{ this.state.fieldsNumber > 100 ?
						<WidgetDynamicTitle title={"Fields Number should be <= 100!"}
						                    hasError={true}
						                    dataTest="fields_num_error" />
						: <React.Fragment>
								<WidgetDynamicTitle title={hasError ?  NUM_ERROR : FORM_INTRO}
								                    hasError={hasError} />
									<ul className={styles.list}>
										{ this.renderInputFields()}
										<li key="total" data-test="total" className={styles.cell}>
											{total}
										</li>
									</ul>
							</React.Fragment>
					}
				</section>
		);
	}
}