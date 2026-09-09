import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { shiftsApi } from "../api";
import type { CreateShiftPayload, UpdateShiftPayload } from "../types";

const SHIFTS_KEY = ["shifts"];

export function useGetShifts(page: number, pageSize: number) {
	return useQuery({ queryKey: [...SHIFTS_KEY, page, pageSize], queryFn: () => shiftsApi.list(page, pageSize) });
}

export function useGetShift(id: number) {
	return useQuery({
		queryKey: [...SHIFTS_KEY, id],
		queryFn: () => shiftsApi.getOne(id),
		enabled: !!id,
	});
}

export function useCreateShift() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (payload: CreateShiftPayload) => shiftsApi.create(payload),
		onSuccess: () => qc.invalidateQueries({ queryKey: SHIFTS_KEY }),
	});
}

export function useUpdateShift() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, payload }: { id: number; payload: UpdateShiftPayload }) =>
			shiftsApi.update(id, payload),
		onSuccess: () => qc.invalidateQueries({ queryKey: SHIFTS_KEY }),
	});
}

export function useDeleteShift() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => shiftsApi.delete(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: SHIFTS_KEY }),
	});
}