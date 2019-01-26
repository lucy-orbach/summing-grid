export default class FormUtils {
	static clearInputValue = value => value.split(/[ ,]+/).join('');

	static formatNumericValue = value => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	static validateNumber = value => !isNaN(value);
};