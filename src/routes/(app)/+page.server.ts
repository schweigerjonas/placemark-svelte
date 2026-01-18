import { service } from "$lib/services/service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const [categories, pois] = await Promise.all([service.getAllCategories(), service.getAllPOIs()]);

	return {
		categories,
		pois
	};
};
