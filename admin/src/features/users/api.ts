import { apiClient } from "../../api/client";
import type { User, CreateUserPayload, UpdateUserPayload } from "./types";

export const usersApi = {
	list: async () => (await apiClient.get<User[]>("/users")).data,
	getOne: async (id: number) => (await apiClient.get<User>(`/users/${id}`)).data,
	create: async (payload: CreateUserPayload) =>
		(await apiClient.post<User>("/users", payload)).data,
	update: async (id: number, payload: UpdateUserPayload) =>
		(await apiClient.put<User>(`/users/${id}`, payload)).data,
	delete: async (id: number) => {
		await apiClient.delete(`/users/${id}`);
	},
};