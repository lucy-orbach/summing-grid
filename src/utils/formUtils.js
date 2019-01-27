import { ValueKeys } from 'utils/constants';

export default class FormUtils {
	static clearInputValue = value => value.split(/[ ,]+/).join('');

	static formatNumericValue = value => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	static validateNumber = value => !isNaN(value);

	// format number to nearest value
	static formatToNearestValue = value => {
		for ( let key of Object.keys(ValueKeys) ) {
			let exp = ValueKeys[key];
			if ( value >= exp) {
				if (key === 'BIG') return FormUtils.getVeryBigNumber(value);
				return `${(value/exp).toPrecision(3)} ${key}`;
			}
		}

		return value.toPrecision(3);
	};

	// returns a scientific notation for large number
	static getVeryBigNumber = value => {
		let digits = value.toString().split('');
		let rest = digits.splice(3);
		let newValue = (parseInt(digits.join(''))/100).toPrecision(3);
		let exp = rest.length + 1;

		return `${newValue} x 10e+${exp}`;
	};
};