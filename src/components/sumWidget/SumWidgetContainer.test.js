import React from 'react';
import 'setupTests';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SumWidgetContainer from 'components/sumWidget/SumWidgetContainer';
import TestUtils from 'utils/TestUtils';
import * as CONSTANTS from 'utils/constants';
//
let { FIELDS } = CONSTANTS.appConstants;

describe('<SumWidgetContainer />', () => {

	it('should render SumWidgetContainer component ', () => {
		const wrapper = shallow(<SumWidgetContainer />);
		expect( wrapper.find('[data-test="sum_widget_container"]').exists()).toBe(true);
	});

	it('Fields Number should be from 2 - 100', () => {
		let wrapper = shallow(<SumWidgetContainer fieldsNumber={100}/>);
		expect(wrapper.find('[data-test="total"]').exists()).toBe(true);

		wrapper = shallow(<SumWidgetContainer fieldsNumber={1} />);
		expect(wrapper.find('[data-test="total"]').exists()).toBe(false);

		 wrapper = shallow(<SumWidgetContainer fieldsNumber={101} />);
			expect(wrapper.find('[data-test="total"]').exists()).toBe(false);
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


  it('on input change, value should remove format and set on state', () => {
	  const wrapper = shallow(<SumWidgetContainer />);
	  // remove comas
	  let updatedInput = TestUtils.updateInput(wrapper,1,'3,000');
	  expect( wrapper.state().fields[1].value).toBe('3000');
	  // remove  whitespaces
	   updatedInput = TestUtils.updateInput(wrapper,1,' 3,00 0');
	  expect( wrapper.state().fields[1].value).toBe('3000');
  });


  it('if not a number => should display value entered, add error to field and display error text', () => {
	  const wrapper = shallow(<SumWidgetContainer />);
	  // remove comas
	  let updatedInput = TestUtils.updateInput(wrapper,1,'3r');
	  expect( wrapper.state().fields[1].value).toBe('3r');
	  expect( wrapper.state().fields[1].error).toBe(true);
  });


  it('should sum valid values', () => {
	  const wrapper = shallow(<SumWidgetContainer />);
	  expect( wrapper.state().sum).toBe(0);
	  let updateInput0 = TestUtils.updateInput(wrapper,0,'3');
	  expect( wrapper.state().sum).toBe(3);
	  let updateInput1 = TestUtils.updateInput(wrapper,1,'5x');
	  expect( wrapper.state().sum).toBe(3);
	   updateInput1 = TestUtils.updateInput(wrapper,1,'5');
	  expect( wrapper.state().sum).toBe(8);
	  let updateInput2 = TestUtils.updateInput(wrapper,2,'');
	  expect( wrapper.state().sum).toBe(8);
	  updateInput2 = TestUtils.updateInput(wrapper,2,'2');
	  expect( wrapper.state().sum).toBe(10);
  });


  it('should display formatted total', () => {
	  const wrapper = shallow(<SumWidgetContainer />);

	  expect( wrapper.find('[data-test="total"]').text()).toBe("0.00");
	  let updatedInput = TestUtils.updateInput(wrapper,1,'1.567');
	  expect( wrapper.find('[data-test="total"]').text()).toBe('1.57');
	  updatedInput = TestUtils.updateInput(wrapper,1,'15.67');
	  expect( wrapper.find('[data-test="total"]').text()).toBe('15.7');
	  updatedInput = TestUtils.updateInput(wrapper,1,'156.7');
	  expect( wrapper.find('[data-test="total"]').text()).toBe('157');
	  updatedInput = TestUtils.updateInput(wrapper,1,'1567');
	  expect( wrapper.find('[data-test="total"]').text()).toBe('1.57 K');
	  updatedInput = TestUtils.updateInput(wrapper,1,'1567000');
	  expect( wrapper.find('[data-test="total"]').text()).toBe('1.57 M');
	  updatedInput = TestUtils.updateInput(wrapper,1,'1567000000');
	  expect( wrapper.find('[data-test="total"]').text()).toBe('1.57 B');
	  updatedInput = TestUtils.updateInput(wrapper,1,'1567000000000');
	  expect( wrapper.find('[data-test="total"]').text()).toBe('1.57 T');
	  updatedInput = TestUtils.updateInput(wrapper,1,'1567000000000000');
	  expect( wrapper.find('[data-test="total"]').text()).toBe('1.57 Q');
	  updatedInput = TestUtils.updateInput(wrapper,1,'1567000000000000000');
	  expect( wrapper.find('[data-test="total"]').text()).toBe('1.56 x 10e+17');
  });


	it('matches the snapshot', () => {
		const tree = shallow(<SumWidgetContainer />);
		expect(toJson(tree)).toMatchSnapshot()
	});

});