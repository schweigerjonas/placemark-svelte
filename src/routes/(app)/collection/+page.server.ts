import { service } from "$lib/services/service";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { CategoryInfo, PointOfInterestInfo, Session } from "$lib/types/types";

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
							message: `Category "${categoryDetails.title}" created.`
						}
					};
				} else {
					return fail(500, {
						createCategory: {
							success: false,
							message: "Failed to create category."
						}
					});
				}
			}
		}
	},

	deleteCategory: async ({ request, cookies }) => {
		const cookieStr = cookies.get("placemark-user") as string;

		if (cookieStr) {
			const session = JSON.parse(cookieStr) as Session;

			if (session) {
				const form = await request.formData();
				const id = form.get("categoryId") as string;
				const title = form.get("title") as string;

				if (!id || !title) {
					return fail(400, {
						deleteCategory: { success: false, message: "Something went wrong." }
					});
				}

				const success = await service.deleteCategoryById(id, session.token);

				if (success) {
					return { deleteCategory: { success: true, message: `Category "${title}" deleted.` } };
				} else {
					return fail(500, {
						deleteCategory: { success: false, message: "Failed to delete category." }
					});
				}
			}
		}
	},

	createPOI: async ({ request, cookies }) => {
		const cookieStr = cookies.get("placemark-user") as string;

		if (cookieStr) {
			const session = JSON.parse(cookieStr) as Session;

			if (session) {
				const form = await request.formData();
				const categoryId = form.get("categoryId") as string;
				const poiDetails = {
					name: form.get("poiName") as string,
					description: form.get("poiDescription") as string,
					location: {
						lat: form.get("poiLatitude") as string,
						lng: form.get("poiLongitude") as string
					},
					img: [
						{
							url: "",
							publicID: ""
						}
					]
				} as PointOfInterestInfo;

				if (
					!poiDetails.name ||
					!poiDetails.description ||
					!poiDetails.location.lat ||
					!poiDetails.location.lng
				) {
					return fail(400, {
						createPOI: { success: false, message: "Something went wrong.", lat: "", lng: "" }
					});
				}

				const success = await service.createPOI(categoryId, poiDetails, session.token);

				if (success) {
					return {
						createPOI: {
							success: true,
							message: `Point of Interest "${poiDetails.name}" created.`,
							lat: poiDetails.location.lat,
							lng: poiDetails.location.lng
						}
					};
				} else {
					return fail(500, {
						createPOI: {
							success: false,
							message: "Failed to create point of interest.",
							lat: "",
							lng: ""
						}
					});
				}
			}
		}
	},

	deletePOI: async ({ request, cookies }) => {
		const cookieStr = cookies.get("placemark-user") as string;

		if (cookieStr) {
			const session = JSON.parse(cookieStr) as Session;

			if (session) {
				const form = await request.formData();
				const id = form.get("poiId") as string;
				const name = form.get("name") as string;

				if (!id || !name) {
					return fail(400, {
						deletePOI: { success: false, message: "Something went wrong." }
					});
				}

				const success = await service.deletePOIById(id, session.token);

				if (success) {
					return {
						deletePOI: { success: true, message: `Point of Interest "${name}" deleted.` }
					};
				} else {
					return fail(500, {
						deletePOI: { success: false, message: "Failed to delete point of interest." }
					});
				}
			}
		}
	},

	uploadImage: async ({ request, cookies }) => {
		const cookieStr = cookies.get("placemark-user") as string;

		if (cookieStr) {
			const session = JSON.parse(cookieStr) as Session;

			if (session) {
				const form = await request.formData();
				const poiId = form.get("poiId") as string;
				const file = form.get("poiImage") as File;

				if (!file || file.size === 0) {
					return fail(400, { uploadImage: { success: false, message: "No file selected." } });
				}

				const poi = await service.getPOIById(poiId, session.token);

				if (!poi) {
					return fail(400, {
						uploadImage: {
							success: false,
							message: "Failed to find point of interest to upload image to."
						}
					});
				}

				const success = await service.addImageToPOI(poi, file, session.token);

				if (success) {
					return {
						uploadImage: { success: true, message: "Image uploaded." }
					};
				} else {
					return fail(500, {
						uploadImage: {
							success: false,
							message: "Failed to upload image."
						}
					});
				}
			}
		}
	},

	deleteImage: async ({ request, cookies }) => {
		const cookieStr = cookies.get("placemark-user") as string;

		if (cookieStr) {
			const session = JSON.parse(cookieStr) as Session;

			if (session) {
				const form = await request.formData();

				const poiId = form.get("poiId") as string;
				const imageId = form.get("imageId") as string;

				if (!poiId || !imageId) {
					return fail(400, {
						deleteImage: {
							success: false,
							message: "Something went wrong."
						}
					});
				}

				const poi = await service.getPOIById(poiId, session.token);

				if (!poi) {
					return fail(400, {
						deleteImage: {
							success: false,
							message: "Something went wrong. Could not find point of interest."
						}
					});
				}

				const success = await service.deleteImageFromPOI(poi, imageId, session.token);

				if (success) {
					return {
						deleteImage: {
							sucess: true,
							message: "Image deleted."
						}
					};
				} else {
					return fail(500, {
						deleteImage: {
							success: false,
							message: "Failed to delete image."
						}
					});
				}
			}
		}
	}
};
