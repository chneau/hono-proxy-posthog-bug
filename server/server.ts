import type { Serve } from "bun";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { showRoutes } from "hono/dev";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { proxy } from "hono/proxy";
import { timing } from "hono/timing";
import { trimTrailingSlash } from "hono/trailing-slash";
import { z } from "zod";

const POSTHOG_TOKEN = z.string().min(1).parse(Bun.env.POSTHOG_TOKEN);
const API_HOST = "eu.i.posthog.com";
const ASSET_HOST = "eu-assets.i.posthog.com";

const app = new Hono()
	.use(logger())
	.use(etag())
	.use(timing({ crossOrigin: true }))
	.use(cors())
	.use(trimTrailingSlash())
	.get("/hello", (c) => c.text(`Server time is ${new Date().toISOString()}.`))
	.get("/posthogToken", (c) => c.text(POSTHOG_TOKEN))
	.all("/ingest-working/*", async (c) => {
		// from https://posthog.com/docs/advanced/proxy/remix
		// working
		const request = c.req.raw;
		const url = new URL(request.url);
		const hostname =
			url.pathname.startsWith("/ingest-working/static/") ||
			url.pathname.startsWith("/ingest-working/array/")
				? ASSET_HOST
				: API_HOST;
		const newUrl = `https://${hostname}${`${url.pathname.replace("/ingest-working", "")}${url.search}`}`;
		console.log(newUrl);
		const headers = new Headers(request.headers);
		headers.set("host", hostname);

		const response = await fetch(newUrl, {
			method: request.method,
			headers,
			body: request.body,
		});

		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: response.headers,
		});
	})
	.all("/ingest/*", async (c) => {
		// trying to use https://hono.dev/examples/proxy
		// not working as expected
		const request = c.req.raw;
		const url = new URL(request.url);
		const hostname =
			url.pathname.startsWith("/ingest/static/") ||
			url.pathname.startsWith("/ingest/array/")
				? ASSET_HOST
				: API_HOST;
		const newUrl = `https://${hostname}${`${url.pathname.replace("/ingest", "")}${url.search}`}`;
		console.log(newUrl);
		request.headers.set("host", hostname);
		return proxy(newUrl, request);
	});

showRoutes(app);

export default { ...app, idleTimeout: 20 } satisfies Serve;
export type ServerType = typeof app;
