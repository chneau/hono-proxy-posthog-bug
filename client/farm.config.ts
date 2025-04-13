import { defineConfig } from "@farmfe/core";
import reactPlugin from "@farmfe/plugin-react";

export default defineConfig({
	plugins: [reactPlugin()],
	clearScreen: false,
});
