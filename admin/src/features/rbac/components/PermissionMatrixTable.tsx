import PermissionCheckbox from "./PermissionCheckbox";

import type { PermissionRow } from "../../rbac/types";

import styles from "./PermissionMatrixTable.module.css";



interface PermissionMatrixTableProps {
    rows: PermissionRow[];
    selectedIds: Set<number>;
    onTogglePermission: (id: number) => void;
    onToggleRow: (row: PermissionRow) => void;
}

function PermissionMatrixTable({
    rows,
    selectedIds,
    onTogglePermission,
    onToggleRow,
}: PermissionMatrixTableProps) {
        
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.matrixTable}>
                <thead>
                    <tr>
                        <th className={styles.resourceHeader}>Module</th>
                        <th className={styles.actionHeader}>Read</th>
                        <th className={styles.actionHeader}>Write</th>
                    </tr>
                </thead>

                <tbody>
                    {rows.map((row) => (
                        <tr key={row.module}>
                            <td className={styles.resourceCell}>
                                <button
                                    type="button"
                                    className={styles.resourceNameBtn}
                                    onClick={() => onToggleRow(row)}
                                >
                                    {row.module}
                                </button>
                            </td>

                            <td className={styles.checkboxCell}>
                                {row.read ? (
                                    <PermissionCheckbox
                                        isChecked={selectedIds.has(row.read.id)}
                                        onChange={() =>
                                            onTogglePermission(row.read!.id)
                                        }
                                        label={`${row.module} read`}
                                    />
                                ) : (
                                    <span className={styles.emptyCell}>—</span>
                                )}
                            </td>

                            <td className={styles.checkboxCell}>
                                {row.write ? (
                                    <PermissionCheckbox
                                        isChecked={selectedIds.has(row.write.id)}
                                        onChange={() =>
                                            onTogglePermission(row.write!.id)
                                        }
                                        label={`${row.module} write`}
                                    />
                                ) : (
                                    <span className={styles.emptyCell}>—</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PermissionMatrixTable;