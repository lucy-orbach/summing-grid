import React from 'react';
import 'setupTests';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from 'App';

describe('<App />', () => {

	it('should render App component ', () => {
		const wrapper = shallow(<App />);
		expect( wrapper.find('[data-test="app"]').exists()).toBe(true);
	});

	it('matches the snapshot', () => {
		const tree = shallow(<App />);
		expect(toJson(tree)).toMatchSnapshot()
	});

});

