await Promise.all([
	Bun.$`bun x farm start --clearScreen=false client`,
	Bun.$`bun --watch server/server.ts`,
]);
