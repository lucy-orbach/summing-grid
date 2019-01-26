import React from 'react';

const WidgetDynamicTitle = React.memo(({title, ...props}) => (
	<div className={"container"}>
		<h1 className={"title"}>
			{title}
		</h1>
	</div>
));

export default WidgetDynamicTitle;