import React from 'react';
import 'setupTests';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Header from 'components/header/Header';

describe('<Header />', () => {

	it('should render Header component ', () => {
		const wrapper = shallow(<Header />);
		expect( wrapper.find('[data-test="header"]').exists()).toBe(true);
	});

	it('matches the snapshot', () => {
		const tree = shallow(<Header />);
		expect(toJson(tree)).toMatchSnapshot()
	});

});
