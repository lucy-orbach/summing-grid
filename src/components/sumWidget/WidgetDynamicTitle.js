import React from 'react';
import styles from 'components/sumWidget/SumWidgetContainer.module.css';
import types from 'styles/typography.module.css';


const WidgetDynamicTitle = React.memo(({title, hasError, ...props}) => (
	<div className={styles.banner_container}>
		<h1 className={hasError ? types.banner_error : types.banner} data-test="widget_title">
			{ title}
		</h1>
	</div>
));

export default WidgetDynamicTitle;