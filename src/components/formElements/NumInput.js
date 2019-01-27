import React from 'react';
import PropTypes from 'prop-types';

const NumInput = React.memo(({name, value,  onChange, onClick, ...props}) => (
	<input type="text"
	       name={name}
	       value={value}
	       onChange={onChange}
	       onClick={onClick}
	       placeholder={0} />
));

NumInput.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onClick: PropTypes.func,
};
export default NumInput;