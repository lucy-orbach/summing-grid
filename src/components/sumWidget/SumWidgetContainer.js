import React, { Component } from 'react';
import WidgetDynamicTitle from 'components/sumWidget/WidgetDynamicTitle';

export default class SumWidgetContainer extends Component {
	render() {
		return (
			<div className={"container"}>
				<WidgetDynamicTitle title={"hi"} />
				<ul className={"list"}>
					<li className={"cell"}>1</li>
					<li className={"cell"}>2</li>
					<li className={"cell"}>3</li>
					<li className={"cell"}>Total</li>
				</ul>
			</div>
		);
	}
}