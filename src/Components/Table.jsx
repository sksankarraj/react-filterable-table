import React from 'react';

class Table extends React.Component {
	constructor(props) {
		super(props);
		this.headerSortClassName = this.headerSortClassName.bind(this);
	}

	headerSortClassName(field) {
		if (field.sortable) {
			if (this.props.sort === field.name || this.props.sort === field.sortFieldName) {
				if (this.props.sortDir) {
					return "fa fa-sort-asc";
				} else {
					return "fa fa-sort-desc";
				}
			}
			return "fa fa-sort";
		}
		return null;
	}

	render() {
		const {
			addExactFilter,
			updateSort,
			page,
			pageSize,
			visible
		} = this.props;

		// Paging - slice array based on what should be shown
		const startIndex = page * pageSize;
		const endIndex = startIndex + pageSize;

		const records = this.props.records.slice(startIndex, endIndex);
		const fields = this.props.fields.filter(field => {
			// If the field has the visible property set to false, ignore it
			return field.visible !== false;
		});

		const headerCells = fields.map((field, i) => {
			return (
				<th onClick={field.sortable ? () => updateSort(field.sortFieldName || field.name) : null} className={field.thClassName ? field.thClassName : null} key={i}>
					<span className={field.sortable ? "sortable" : null}>{field.displayName || field.name}</span>
					<span className={this.headerSortClassName(field)}></span>
				</th>
			);
		});

		const rows = records.map((record, i) => {

			const tableTds = fields.map((field, q) => {
				let recordBody = record[field.name];
				let spanClassName = field.exactFilterable && record[field.name] ? "filterable " : "";
				const renderProps = { value: record[field.name], record, field, ...this.props };

				// Build out the body of the <td>
				if (field.render) {
					// This field has a render function; call it with our props
					recordBody = field.render(renderProps);
				} else {
					// If the record is empty and the field has something set for emptyDisplay, use that as the text.
					if (field.emptyDisplay && (!recordBody || recordBody.length === 0)) {
						recordBody = field.emptyDisplay;
					}
				}

				// add the "empty" classname if record is empty
				if (!record[field.name] || record[field.name].length === 0) {
					spanClassName += "empty"
				}


				return (
					<td className={field.tdClassName ? field.tdClassName : null} key={q}>
						<span className={spanClassName} onClick={field.exactFilterable ? () => addExactFilter(record[field.name], field.name, (field.displayName || field.name)) : null}>
							{recordBody}
						</span>
					</td>
				);
			});

			return (
				<tr key={i}>
					{tableTds}
				</tr>
			);
		});

		const tfootCells = fields.map((field, i) => {
			return (
				<td key={i} className={field.tdClassName ? field.tdClassName : null}>
					{field.footerValue || '' }
				</td>
			);
		});


		return (
			rows.length === 0 ? 
				(<p className="well text-center">{this.props.noFilteredRecordsMessage || 'There are no records to display.'}</p>)
			:
			<div>
				<table className="table table-condensed table-hover filterable-table">
					<thead>
						<tr>
							{headerCells}
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
					<tfoot>
						<tr>
							{tfootCells}
						</tr>
					</tfoot>
				</table>
			</div>
		);
	}
}

module.exports = Table;
