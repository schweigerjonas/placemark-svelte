import { google } from "$lib/server/oauth";
import { service } from "$lib/services/service";
import { redirect, type RequestEvent } from "@sveltejs/kit";
import { decodeIdToken } from "arctic";

export async function GET({ url, cookies }: RequestEvent): Promise<Response> {
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies.get("google_oauth_state");
	const codeVerifier = cookies.get("google_code_verifier");

	if (!code || !state || !storedState || !codeVerifier || state !== storedState) {
		return new Response("Invalid state or missing parameters", {
			status: 400
		});
	}

	try {
		const tokens = await google.validateAuthorizationCode(code, codeVerifier);
		const claims = decodeIdToken(tokens.idToken()) as { sub: string; name: string; email: string };

		// Pass to Hapi via your service
		const session = await service.loginWithGoogle(claims.sub, claims.name, claims.email);

		if (session) {
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
	} catch (e) {
		console.error(e);

		return new Response("Google authentication failed", {
			status: 400
		});
	}

	throw redirect(302, "/login?error=google_failed");
}
