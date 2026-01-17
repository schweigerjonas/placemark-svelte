import { dev } from "$app/environment";
import { service } from "$lib/services/service";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = form.get("email") as string;
		const password = form.get("password") as string;

		if (email === "" || password === "") {
			return fail(400, { message: "Email or password missing." });
		} else {
			const session = await service.login(email, password);

			if (session) {
				const userJson = JSON.stringify(session);
				cookies.set("placemark-user", userJson, {
					path: "/",
					httpOnly: true,
					sameSite: "strict",
					secure: !dev,
					maxAge: 60 * 60 * 24 * 7
				});
				throw redirect(303, "/");
			} else {
				return fail(500, { message: "Email or password wrong." });
			}
		}
	}
};
