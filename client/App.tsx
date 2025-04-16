import { useState } from "react";
import { useQueryHello, useQueryPosthogToken } from "./client";
import {
	initPosthogNormal,
	initPosthogProxy,
	initPosthogWorkingProxy,
} from "./posthog";

export const App = () => {
	const queryHello = useQueryHello();
	const queryPosthogToken = useQueryPosthogToken();
	const [isPosthogRunning, setIsPosthogRunning] = useState(false);
	return (
		<div>
			<h1>Welcome to the App!</h1>
			<p>This is a simple React application.</p>
			<p>
				Server says:{" "}
				<b>
					{queryHello.isLoading
						? "Loading..."
						: queryHello.isError
							? "Error!"
							: queryHello.data}
				</b>
			</p>
			<p>
				PostHog token: <b>{queryPosthogToken.data ? "loaded" : "Loading..."}</b>
				<br />
				<button
					type="button"
					onClick={() => {
						if (!queryPosthogToken.data) return;
						setIsPosthogRunning(true);
						initPosthogNormal(queryPosthogToken.data);
					}}
					disabled={queryPosthogToken.isFetching || isPosthogRunning}
				>
					Run normal PostHog
				</button>
				<button
					type="button"
					onClick={() => {
						if (!queryPosthogToken.data) return;
						setIsPosthogRunning(true);
						initPosthogWorkingProxy(queryPosthogToken.data);
					}}
					disabled={queryPosthogToken.isFetching || isPosthogRunning}
				>
					Run working proxy PostHog
				</button>
				<button
					type="button"
					onClick={() => {
						if (!queryPosthogToken.data) return;
						setIsPosthogRunning(true);
						initPosthogProxy(queryPosthogToken.data);
					}}
					disabled={queryPosthogToken.isFetching || isPosthogRunning}
				>
					Run non-working proxy PostHog (Now working! 🎆)
				</button>
				<button
					type="button"
					onClick={() => location.reload()}
					disabled={!isPosthogRunning}
				>
					Refresh
				</button>
			</p>
		</div>
	);
};
