import { apiClient } from "../../api/client";
import type { 
	User, 
	CreateUserPayload, 
	UpdateUserPayload,
	ListUsersResponse
} from "./types";

export const usersApi = {
	list: async (page?: number, pageSize?: number) => 
		(await apiClient.get<ListUsersResponse>(
			`/users?page=${page}&page_size=${pageSize}`)
		).data,
	getOne: async (id: number) => (await apiClient.get<User>(`/users/${id}`)).data,
	create: async (payload: CreateUserPayload) =>
		(await apiClient.post<User>("/users", payload)).data,
	update: async (id: number, payload: UpdateUserPayload) =>
		(await apiClient.put<User>(`/users/${id}`, payload)).data,
	delete: async (id: number) => {
		await apiClient.delete(`/users/${id}`);
	},
};