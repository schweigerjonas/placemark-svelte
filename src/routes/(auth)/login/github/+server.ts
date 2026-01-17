import { github } from "$lib/server/oauth";
import { generateState } from "arctic";

import type { RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {
	const state = generateState();
	const url = github.createAuthorizationURL(state, []);

	event.cookies.set("github_oauth_state", state, {
		path: "/",
		httpOnly: true,
		sameSite: "lax",
		maxAge: 60 * 10
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString()
		}
	});
}
