import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "../api";
import type { CreateUserPayload, UpdateUserPayload } from "../types";

const USERS_KEY = ["users"];

export function useGetUsers(page: number, pageSize: number) {
	return useQuery({ queryKey: [...USERS_KEY, page, pageSize], queryFn: () => usersApi.list(page, pageSize) });
}

export function useGetUser(id: number) {
	return useQuery({
		queryKey: [...USERS_KEY, id],
		queryFn: () => usersApi.getOne(id),
		enabled: !!id,
	});
}

export function useCreateUser() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (payload: CreateUserPayload) => usersApi.create(payload),
		onSuccess: () => qc.invalidateQueries({ queryKey: USERS_KEY }),
	});
}

export function useUpdateUser() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, payload }: { id: number; payload: UpdateUserPayload }) =>
			usersApi.update(id, payload),
		onSuccess: () => qc.invalidateQueries({ queryKey: USERS_KEY }),
	});
}

export function useDeleteUser() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => usersApi.delete(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: USERS_KEY }),
	});
}