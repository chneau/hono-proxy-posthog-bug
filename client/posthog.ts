import posthog from "posthog-js";
import { serverUrl } from "./client";

export const initPosthogNormal = (token: string) =>
	posthog.init(token, { api_host: "https://eu.i.posthog.com" });

export const initPosthogWorkingProxy = (token: string) =>
	posthog.init(token, {
		api_host: `${serverUrl}/ingest-working`,
		ui_host: "https://eu.i.posthog.com",
	});

export const initPosthogProxy = (token: string) =>
	posthog.init(token, {
		api_host: `${serverUrl}/ingest`,
		ui_host: "https://eu.i.posthog.com",
	});
