import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { devicesApi } from "../api";
import type { CreateDevicePayload, UpdateDevicePayload } from "../types";

const DEVICES_KEY = ["devices"];

export function useGetDevices() {
	return useQuery({ queryKey: DEVICES_KEY, queryFn: devicesApi.list });
}

export function useGetDevice(id: number) {
	return useQuery({
		queryKey: [...DEVICES_KEY, id],
		queryFn: () => devicesApi.getOne(id),
		enabled: !!id,
	});
}

export function useCreateDevice() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (payload: CreateDevicePayload) => devicesApi.create(payload),
		onSuccess: () => qc.invalidateQueries({ queryKey: DEVICES_KEY }),
	});
}

export function useUpdateDevice() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, payload }: { id: number; payload: UpdateDevicePayload }) =>
			devicesApi.update(id, payload),
		onSuccess: () => qc.invalidateQueries({ queryKey: DEVICES_KEY }),
	});
}

export function useDeleteDevice() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => devicesApi.delete(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: DEVICES_KEY }),
	});
}

export function useRegenerateDeviceActivationCode() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => devicesApi.regenerateActivationCode(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: DEVICES_KEY }),
	});
}