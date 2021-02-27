import React from 'react';

function ExactFilter(props) {

	let { filter, removeFilter } = props;
	return (
		<span className="filter-item">
			<span className="filter-item-title">
				<span className="filter-item-remove" onClick={(e) => removeFilter(filter, e)}>
					<span className="fa fa-times"></span>
				</span>
				{filter.name}
			</span>
			<span className="filter-item-value">
				{filter.value}
			</span>
		</span>
	);
}

export default ExactFilter;

