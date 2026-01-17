import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Session, UserInfo } from "$lib/types/types";
import { service } from "$lib/services/service";
import { dev } from "$app/environment";

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();

	if (session) {
		return {
			user: await service.getUserById(session._id, session.token)
		};
	}
};

export const actions: Actions = {
	updateProfileInformation: async ({ request, cookies }) => {
		const cookieStr = cookies.get("placemark-user") as string;

		if (cookieStr) {
			const session = JSON.parse(cookieStr) as Session;

			if (session) {
				const form = await request.formData();
				const id = form.get("id") as string;
				const updateDetails = {
					firstName: form.get("firstName") as string,
					lastName: form.get("lastName") as string,
					email: form.get("email") as string
				} as UserInfo;

				const success = await service.updateUser(id, updateDetails, session.token);

				if (success) {
					session.name = `${updateDetails.firstName} ${updateDetails.lastName}`;
					session.email = updateDetails.email;

					const userJson = JSON.stringify(session);
					cookies.set("placemark-user", userJson, {
						path: "/",
						httpOnly: true,
						sameSite: "strict",
						secure: !dev,
						maxAge: 60 * 60 * 24 * 7
					});

					return {
						updateProfileInformation: {
							success: true,
							message: "Profile information updated.",
							notification: ""
						}
					};
				} else {
					return fail(500, {
						updateProfileInformation: {
							success: false,
							message: "",
							notification: "Something went wrong."
						}
					});
				}
			}
		}
	},
	// changePassword: async ({ request, cookies }) => {
	// 	const cookieStr = cookies.get("placemark-user") as string;
	//
	// 	if (cookieStr) {
	// 		const session = JSON.parse(cookieStr) as Session;
	//
	// 		if (session) {
	// 			const form = await request.formData();
	// 		}
	// 	}
	// }
	deleteAccount: async ({ request, cookies }) => {
		const cookieStr = cookies.get("placemark-user") as string;

		if (cookieStr) {
			const session = JSON.parse(cookieStr) as Session;

			if (session) {
				const form = await request.formData();
				const id = form.get("id") as string;

				if (!id) {
					return fail(400, { deleteAccount: { success: false, message: "Something went wrong." } });
				}

				const success = await service.deleteUserById(id, session.token);

				if (success) {
					throw redirect(303, "/logout");
				} else {
					return fail(500, {
						deleteAccount: { success: false, message: "Couldn't delete account." }
					});
				}
			}
		}
	}
};
