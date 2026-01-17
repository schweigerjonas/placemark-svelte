import { service } from "$lib/services/service";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Session } from "$lib/types/types";

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();

	if (session) {
		return {
			users: await service.getAllUsers(session.token)
		};
	}
};

export const actions: Actions = {
	deleteUser: async ({ request, cookies }) => {
		const cookieStr = cookies.get("placemark-user") as string;

		if (cookieStr) {
			const session = JSON.parse(cookieStr) as Session;

			if (session) {
				const form = await request.formData();
				const id = form.get("id") as string;

				if (!id) {
					return fail(400, { success: false, message: "Something went wrong" });
				}

				const success = await service.deleteUserById(id, session.token);

				if (success) {
					return { success: true };
				} else {
					return fail(500, { success: false, message: "Failed to delete user" });
				}
			}
		}
	}
};
