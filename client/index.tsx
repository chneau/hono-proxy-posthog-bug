import { QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { queryClient } from "./client";

const container = document.querySelector("#root");
if (!container) throw new Error("No root element found");
const root = createRoot(container);
root.render(
	<QueryClientProvider client={queryClient}>
		<App />
	</QueryClientProvider>,
);
