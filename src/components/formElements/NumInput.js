import React from 'react';

const NumInput = React.memo(({value, error, onChange, ...props}) => (
	<input type="number" value={value} onChange={onChange} />
));

export default NumInput;