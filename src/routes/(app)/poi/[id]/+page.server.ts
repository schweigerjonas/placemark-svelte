import { service } from "$lib/services/service";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const poi = await service.getPOIByID(params.id);

	if (!poi) error(404);

	return { poi };
};
