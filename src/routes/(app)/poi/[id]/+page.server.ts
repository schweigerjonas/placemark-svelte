import { service } from "$lib/services/service";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, parent }) => {
	const { session } = await parent();

	if (session) {
		const poi = await service.getPOIById(params.id, session.token);

		if (!poi) {
			throw error(404, "POI not found.");
		}

		const category = await service.getCategoryById(poi.categoryID, session.token);
		if (!category) {
			throw error(404, "Category not found.");
		}

		const [categories, pois] = await Promise.all([
			service.getAllCategories(),
			service.getAllPOIs()
		]);

		return {
			category: category,
			poi: poi,
			categories: categories,
			pois: pois
		};
	}
};
