import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { rolesApi } from "../api";
import type { CreateRolePayload, UpdateRolePayload } from "../types";

const ROLES_KEY = ["roles"];

export function useListRoles(page: number, pageSize: number) {
	return useQuery({ queryKey: [...ROLES_KEY, page, pageSize], queryFn: () => rolesApi.list(page, pageSize) });
}

export function useGetAllRoles() {
	return useQuery({ queryKey: [...ROLES_KEY, "all"], queryFn: () => rolesApi.getAll() });
}

export function useGetRole(id: number) {
	return useQuery({
		queryKey: [...ROLES_KEY, id],
		queryFn: () => rolesApi.getOne(id),
		enabled: !!id,
	});
}

export function useCreateRole() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (payload: CreateRolePayload) => rolesApi.create(payload),
		onSuccess: () => qc.invalidateQueries({ queryKey: ROLES_KEY }),
	});
}

export function useUpdateRole() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, payload }: { id: number; payload: UpdateRolePayload }) =>
			rolesApi.update(id, payload),
		onSuccess: () => qc.invalidateQueries({ queryKey: ROLES_KEY }),
	});
}

export function useDeleteRole() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => rolesApi.delete(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: ROLES_KEY }),
	});
}

export function useGetRolePermissions(id: number) {
	return useQuery({
		queryKey: [...ROLES_KEY, id, "permissions"],
		queryFn: () => rolesApi.getPermissions(id),
		enabled: !!id,
	});
}