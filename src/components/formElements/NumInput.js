import React from 'react';

const NumInput = React.memo(({name, value, error, onChange, onClick, ...props}) => (
	<input type="text"
	       name={name}
	       value={value}
	       onChange={onChange}
	       onClick={onClick}
	       placeholder={0} />
));

export default NumInput;