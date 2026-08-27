import { useEffect, useState, type SubmitEvent } from "react";

import FormField from "../../../components/FormField/FormField";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import ButtonLoader from "../../../components/ButtonLoader/ButtonLoader";
import Card from "../../../components/Card/Card";
import PermissionMatrixTable from "./PermissionMatrixTable";

import styles from "../../../styles/ManagementPage.module.css";

import type { Permission, PermissionRow } from "../types";
import { useGetPermissions } from "../hooks/usePermissions";
import Loader from "../../../components/Loader/Loader";

const EMPTY_PERMISSION_IDS: number[] = [];

type RoleFormProps = {
    mode: "create" | "edit";
    initialName?: string;
    initialPermissionIds?: number[];
    isPending: boolean;
    onSubmit: (data: {
        roleName: string;
        permissionIds: number[];
    }) => void;
};

function RoleForm({
    mode,
    initialName = "",
    initialPermissionIds = EMPTY_PERMISSION_IDS,
    isPending,
    onSubmit,
}: RoleFormProps) {
    const [roleName, setRoleName] = useState(initialName);
    const [nextForm, setNextForm] = useState(false);

    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set(initialPermissionIds));

    const [errors, setErrors] = useState({
        roleName: "",
    });

    const { data: permissions = [], isLoading } = useGetPermissions();

    useEffect(() => {
        setRoleName(initialName);
    }, [initialName]);

    useEffect(() => {
        setSelectedIds(new Set(initialPermissionIds));
    }, [initialPermissionIds]);

    function validateRoleName() {
        const nextErrors = {
            roleName: "",
        };

        const trimmedName = roleName.trim();

        if (!trimmedName) {
            nextErrors.roleName = "Please enter a role name";
        } else if (trimmedName.length < 4) {
            nextErrors.roleName =
                "Role name must be at least 4 characters long";
        }

        setErrors(nextErrors);

        return !Object.values(nextErrors).some(Boolean);
    }

    function passToNextForm() {
        if (!validateRoleName()) {
            return;
        }

        setNextForm(true);
    }

    function togglePermission(id: number) {
        setSelectedIds((current) => {
            const next = new Set(current);

            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }

            return next;
        });
    }

    function toggleRow(row: PermissionRow) {
        const rowPermissions = [row.read, row.write].filter(
            Boolean
        ) as Permission[];

        setSelectedIds((current) => {
            const next = new Set(current);

            const allSelected = rowPermissions.every((permission) =>
                current.has(permission.id)
            );

            for (const permission of rowPermissions) {
                if (allSelected) {
                    next.delete(permission.id);
                } else {
                    next.add(permission.id);
                }
            }

            return next;
        });
    }

    function buildPermissionRows(permissions: Permission[]) {
        const rows: PermissionRow[] = []; 
        for (const permission of permissions) { 
            const [module, action] = permission.code.split(":"); 
            let row = rows.find((item) => item.module === module); 
            if (!row) { 
                row = { module, }; 
                rows.push(row); 
            } 
            if (action === "read") { 
                row.read = permission; 
            } 
            if (action === "write") { 
                row.write = permission; 
            } 
        } 
        return rows; 
    }

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!validateRoleName()) {
            setNextForm(false);
            return;
        }

        onSubmit({
            roleName: roleName.trim(),
            permissionIds: Array.from(selectedIds),
        });
    }

    
    if (isLoading) {
        return (
            <div className={styles.main}>
                <Loader />
            </div>
        )
    }

    return (
        <>
            {!nextForm && (
                <Card>
                    <FormField
                        label="Name"
                        htmlFor="role-name"
                        error={errors.roleName}
                    >
                        <Input
                            id="role-name"
                            type="text"
                            placeholder="e.g. HR Manager, Supervisor"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                        />
                    </FormField>

                    <Button onClick={passToNextForm}>
                        Next
                    </Button>
                </Card>
            )}

            {nextForm && (
                <Card>
                    <form
                        onSubmit={handleSubmit}
                        className={styles.form}
                    >
                        <label className={styles.formLabel}>
                            Permissions
                        </label>

                        <PermissionMatrixTable
                            rows={buildPermissionRows(permissions)}
                            selectedIds={selectedIds}
                            onTogglePermission={togglePermission}
                            onToggleRow={toggleRow}
                        />

                        <div className={styles.formButtonsContainer}>
                            <Button
                                type="button"
                                onClick={() => setNextForm(false)}
                            >
                                Back
                            </Button>

                            <Button type="submit">
                                {isPending ? (
                                    <ButtonLoader />
                                ) : mode === "create" ? (
                                    "Create"
                                ) : (
                                    "Confirm"
                                )}
                            </Button>
                        </div>
                    </form>
                </Card>
            )}
        </>
    );
}

export default RoleForm;