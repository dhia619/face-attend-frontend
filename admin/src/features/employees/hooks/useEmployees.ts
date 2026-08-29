import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { employeesApi } from "../api";
import type { CreateEmployeePayload, UpdateEmployeePayload, CreateEmbeddingPayload } from "../types";

const EMPLOYEES_KEY = ["employees"];

export function useGetEmployees() {
	return useQuery({ queryKey: EMPLOYEES_KEY, queryFn: employeesApi.list });
}

export function useGetEmployee(id: number) {
	return useQuery({
		queryKey: [...EMPLOYEES_KEY, id],
		queryFn: () => employeesApi.getOne(id),
		enabled: !!id,
	});
}

export function useCreateEmployee() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (payload: CreateEmployeePayload) => employeesApi.create(payload),
		onSuccess: () => qc.invalidateQueries({ queryKey: EMPLOYEES_KEY }),
	});
}

export function useUpdateEmployee() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, payload }: { id: number; payload: UpdateEmployeePayload }) =>
			employeesApi.update(id, payload),
		onSuccess: () => qc.invalidateQueries({ queryKey: EMPLOYEES_KEY }),
	});
}

export function useDeleteEmployee() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => employeesApi.delete(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: EMPLOYEES_KEY }),
	});
}

export function useAddmployeeFace() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, payload }: { id: number; payload: CreateEmbeddingPayload }) =>
			employeesApi.addFace(id, payload),
		onSuccess: () => qc.invalidateQueries({ queryKey: EMPLOYEES_KEY }),
	});
}