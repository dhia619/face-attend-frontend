import { useQuery } from "@tanstack/react-query";
import { permissionsApi } from "../api";

const PERMISSIONS_KEY = ["permissions"];

export function useGetPermissions() {
	return useQuery({ queryKey: PERMISSIONS_KEY, queryFn: permissionsApi.list });
}
