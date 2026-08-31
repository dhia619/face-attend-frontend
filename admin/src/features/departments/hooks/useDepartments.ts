import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { departmentsApi } from "../api";
import type { CreateDepartmentPayload, UpdateDepartmentPayload } from "../types";

const DEPARTMENTS_KEY = ["departments"];

export function useListDepartments(page: number, pageSize: number) {
	return useQuery({ queryKey: [DEPARTMENTS_KEY, page, pageSize], queryFn: () => departmentsApi.list(page, pageSize) });
}

export function useGetAllDepartments() {
	return useQuery({ queryKey: [...DEPARTMENTS_KEY, "all"], queryFn: () => departmentsApi.getAll() });
}

export function useGetDepartment(id: number) {
	return useQuery({
		queryKey: [...DEPARTMENTS_KEY, id],
		queryFn: () => departmentsApi.getOne(id),
		enabled: !!id,
	});
}

export function useCreateDepartment() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (payload: CreateDepartmentPayload) => departmentsApi.create(payload),
		onSuccess: () => qc.invalidateQueries({ queryKey: DEPARTMENTS_KEY }),
	});
}

export function useUpdateDepartment() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, payload }: { id: number; payload: UpdateDepartmentPayload }) =>
			departmentsApi.update(id, payload),
		onSuccess: () => qc.invalidateQueries({ queryKey: DEPARTMENTS_KEY }),
	});
}

export function useDeleteDepartment() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => departmentsApi.delete(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: DEPARTMENTS_KEY }),
	});
}