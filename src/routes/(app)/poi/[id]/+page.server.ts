import { service } from "$lib/services/service";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const poi = await service.getPOIById(params.id);
	if (!poi) error(404);

	const category = await service.getCategoryById(poi.categoryID);
	if (!category) error(404);

	return { poi: poi, category: category };
};
