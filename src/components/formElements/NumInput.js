import React from 'react';

const NumInput = React.memo(({name, value, error, onChange, ...props}) => (
	<input type="text" name={name} value={value} onChange={onChange} placeholder={0} />
));

export default NumInput;