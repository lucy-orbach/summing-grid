import React from 'react';
import 'setupTests';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SumWidgetContainer from 'components/sumWidget/SumWidgetContainer';
import TestUtils from 'utils/TestUtils';
import * as CONSTANTS from 'utils/constants';
//
let { FIELDS, FIELD_TEMPLATE} = CONSTANTS.appConstants;
let { FORM_INTRO, NUM_ERROR } = CONSTANTS.formConstants;


describe('<SumWidgetContainer />', () => {

	it('should render SumWidgetContainer component ', () => {
		const wrapper = shallow(<SumWidgetContainer />);
		expect( wrapper.find('[data-test="sum_widget_container"]').exists()).toBe(true);
	});


	it('should add correct amount of fields', () => {
		const wrapper = shallow(<SumWidgetContainer />);
		expect(Object.keys(wrapper.state().fields).length).toBe(FIELDS);
	});


	it('should render correct amount of Inputs',() => {
		const wrapper = shallow(<SumWidgetContainer />);
		expect( wrapper.find('li').length).toBe(4);
	});


	it('input value should clear when current value is 0', () => {
		const wrapper = shallow(<SumWidgetContainer />);
		const ele = wrapper.find('[data-test="input-0"]');
		ele.simulate('click', { target:{ name: 0, value: "0" }});
		expect( wrapper.find('[data-test="input-0"]').props().value).toBe('');

		ele.simulate('click', { target:{ name: 0, value: "30" }});
		expect( wrapper.find('[data-test="input-0"]').props().value).toBe('30');
	});


	it('user should be able to enter value on input', () => {
		const wrapper = shallow(<SumWidgetContainer />);
		const updatedInput = TestUtils.updateInput(wrapper,1,'30');
		expect( updatedInput.props().value).toBe('30');
	});


  it('on input change, value should remove format and be enter as numeric', () => {
	  const wrapper = shallow(<SumWidgetContainer />);
	  // remove comas
	  let updatedInput = TestUtils.updateInput(wrapper,1,'3,000');
	  expect( wrapper.state().fields[1].value).toBe(3000);
	  // remove  whitespaces
	   updatedInput = TestUtils.updateInput(wrapper,1,' 3,00 0');
	  expect( wrapper.state().fields[1].value).toBe(3000);
  });


  it('should handle error if input is not a number', () => {
	  const wrapper = shallow(<SumWidgetContainer />);
	  // remove comas
	  let updatedInput = TestUtils.updateInput(wrapper,1,'3r');
	  expect( wrapper.state().fields[1].value).toBe(0);
	  expect( wrapper.state().error).toBe(NUM_ERROR);
  });


	it('matches the snapshot', () => {
		const tree = shallow(<SumWidgetContainer />);
		expect(toJson(tree)).toMatchSnapshot()
	});

});