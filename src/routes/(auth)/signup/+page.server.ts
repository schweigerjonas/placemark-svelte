import { service } from "$lib/services/service";
import { Role } from "$lib/types/types";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
	signup: async ({ request }) => {
		const form = await request.formData();

		const firstName = form.get("firstName") as string;
		const lastName = form.get("lastName") as string;
		const email = form.get("email") as string;
		const password = form.get("password") as string;

		if (!firstName || !lastName || !email || !password) {
			throw redirect(307, "/signup");
		}

		const success = await service.signup({
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
			role: Role.User
		});

		if (success) {
			throw redirect(303, "/login");
		} else {
			throw redirect(307, "/signup");
		}
	}
};
