import { github } from "$lib/server/oauth";
import { service } from "$lib/services/service";
import { redirect, type RequestEvent } from "@sveltejs/kit";
import type { OAuth2Tokens } from "arctic";

export async function GET({ url, cookies }: RequestEvent): Promise<Response> {
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies.get("github_oauth_state") ?? null;

	if (code === null || state === null || storedState === null) {
		return new Response("Invalid state or missing code", {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;

	try {
		tokens = await github.validateAuthorizationCode(code);
	} catch (err) {
		console.error(err);

		return new Response("Failed to validate authorization code", {
			status: 400
		});
	}

	const githubUserResponse = await fetch("https://api.github.com/user", {
		headers: {
			Authorization: `Bearer ${tokens.accessToken()}`
		}
	});
	const githubUser = await githubUserResponse.json();

	const session = await service.loginWithGithub(githubUser.id, githubUser.login);

	if (!session) {
		throw redirect(302, "/login?error=oauth_failed");
	}

	const userJson = JSON.stringify(session);

	cookies.set("placemark-user", userJson, {
		path: "/",
		httpOnly: true,
		sameSite: "lax",
		secure: import.meta.env.PROD,
		maxAge: 60 * 60 * 24 * 7
	});

	throw redirect(302, "/");
}
