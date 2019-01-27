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
	name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func.isRequired,
	onClick: PropTypes.func,
};
export default NumInput;