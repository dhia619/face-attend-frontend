
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
}

export interface AssignPermissions {
    permission_ids: Array<number>
}