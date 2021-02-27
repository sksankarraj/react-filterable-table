import React from 'react';
import ExactFilter from './ExactFilter';

function ExactFilters(props) {

	let { exactFilters, removeExactFilter } = props;

	let filters = exactFilters.map((filter, i) => {
		return <ExactFilter filter={filter} removeFilter={removeExactFilter} key={i} />;
	});

	return (
		<div className="exact-filters">
			{filters}
		</div>
	);
}

export default ExactFilters;
