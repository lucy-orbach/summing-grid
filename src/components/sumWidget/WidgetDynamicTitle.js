import React from 'react';
import PropTypes from 'prop-types';
import styles from 'components/sumWidget/SumWidgetContainer.module.css';
import types from 'styles/typography.module.css';


const WidgetDynamicTitle = React.memo(({title, hasError, dataTest  , ...props}) => (
	<div className={styles.banner_container}>
		<h1 className={hasError ? types.banner_error : types.banner} data-test={dataTest}>
			{title}
		</h1>
	</div>
));

WidgetDynamicTitle.defaultProps = {
	dataTest: "widget_title"
};

WidgetDynamicTitle.propTypes = {
	title: PropTypes.string,
	hasError: PropTypes.bool,
	dataTest: PropTypes.string
};


export default WidgetDynamicTitle;