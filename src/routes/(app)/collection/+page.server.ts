import { service } from "$lib/services/service";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { CategoryInfo, Session } from "$lib/types/types";

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();

	if (session) {
		const categories = await service.getUserCategories(session._id, session.token);

		// get POIs of all user categories
		const poiPromises = categories.map((category) =>
			service.getCategoryPOIs(category._id, session.token)
		);
		const results = await Promise.all(poiPromises); // resolves all promises in parallel
		const pois = results.flat();

		const categoriesWithPOIs = categories.map((category, i) => {
			return {
				...category,
				pois: results[i]
			};
		});

		return {
			categories: categories,
			pois: pois,
			categoriesWithPOIs: categoriesWithPOIs
		};
	}
};

export const actions: Actions = {
	createCategory: async ({ request, cookies }) => {
		const cookieStr = cookies.get("placemark-user") as string;

		if (cookieStr) {
			const session = JSON.parse(cookieStr) as Session;

			if (session) {
				const form = await request.formData();
				const categoryDetails = {
					title: form.get("categoryTitle") as string,
					img: {
						url: "",
						publicID: ""
					}
				} as CategoryInfo;

				if (!categoryDetails.title) {
					return fail(400, {
						createCategory: { success: false, message: "Category title is required." }
					});
				}

				const success = await service.createCategory(session._id, categoryDetails, session.token);

				if (success) {
					return {
						createCategory: {
							success: true,
							message: `Category ${categoryDetails.title} created.`
						}
					};
				} else {
					return fail(500, {
						createCategory: {
							success: false,
							message: "Could not create category."
						}
					});
				}
			}
		}
	}
};
