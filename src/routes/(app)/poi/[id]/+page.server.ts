import { service } from "$lib/services/service";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const poi = await service.getPOIById(params.id);

	if (!poi) {
		throw error(404, "POI not found.");
	}

	const category = await service.getCategoryById(poi.categoryID);
	if (!category) {
		throw error(404, "Category not found.");
	}

	const [categories, pois] = await Promise.all([service.getAllCategories(), service.getAllPOIs()]);

	return {
		category: category,
		poi: poi,
		categories: categories,
		pois: pois
	};
};
