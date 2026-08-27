import Loader from "../Loader/Loader";
import styles from "./DataTable.module.css";

type Column<T> = {
	key: string;
	header: string;
	render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
	columns: Column<T>[];
	rows: T[];
	rowKey: (row: T) => string | number;
	isLoading?: boolean;
	emptyMessage?: string;
	actions?: (row: T) => React.ReactNode;
};

function DataTable<T extends Record<string, any>>({
	columns,
	rows,
	rowKey,
	isLoading,
	emptyMessage = "No records found.",
	actions,
}: DataTableProps<T>) {
	if (isLoading) {
		return (<div className={styles.center}>
			<Loader />;
		</div>)
	}

	if (rows.length === 0) {
		return <div className={styles.state}>{emptyMessage}</div>;
	}

	return (
		<div className={styles.tableWrapper}>
			<table className={styles.table}>
				<thead>
					<tr>
						{columns.map((col) => (
							<th key={col.key}>{col.header}</th>
						))}
						{actions && <th className={styles.actionsHeader}>Actions</th>}
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => (
						<tr key={rowKey(row)}>
							{columns.map((col) => (
								<td key={col.key}>
									{col.render ? col.render(row) : row[col.key]}
									{row[col.key] === null ? "-" : ""}
								</td>
							))}
							{actions && <td className={styles.actionsCell}>{actions(row)}</td>}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default DataTable;