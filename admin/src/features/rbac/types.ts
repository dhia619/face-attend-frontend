
export interface Role {
    id: number,
    name: string
}

export interface CreateRolePayload {
    name: string
    permission_ids: Array<number> | undefined
}

export interface UpdateRolePayload {
    name: string
    permission_ids: Array<number> | undefined
}

export interface AssignPermissions {
    permission_ids: Array<number>
}

export interface Permission {
    id: number
    code: string
}

export type PermissionRow = {
    module: string;
    read?: Permission;
    write?: Permission;
};

export interface ListRolesResponse {
    roles: Role[]
    page: number,
    page_size: number,
    has_next: boolean
}