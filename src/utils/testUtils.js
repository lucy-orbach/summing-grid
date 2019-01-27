import 'setupTests';
import { shallow, find, simulate } from 'enzyme';

export default class TestUtils {
	static updateInput = ( wrapper, id, value ) => {
		let selector =  `[data-test="input-${id}"]`;
		const input = wrapper.find(selector);
		input.simulate( 'change', { target: { name: id, value: value }} );

		return wrapper.find( selector );
	};


}