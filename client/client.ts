import { QueryClient, useQuery } from "@tanstack/react-query";
import { hc } from "hono/client";
import type { ServerType } from "../server/server";

export const serverUrl = "http://localhost:3000";
export const client = hc<ServerType>(serverUrl);
export const queryClient = new QueryClient();

export const useQueryHello = () =>
	useQuery({
		queryKey: ["hello"],
		queryFn: () => client.hello.$get().then((res) => res.text()),
	});

export const useQueryPosthogToken = () =>
	useQuery({
		queryKey: ["posthogToken"],
		queryFn: () => client.posthogToken.$get().then((res) => res.text()),
	});
