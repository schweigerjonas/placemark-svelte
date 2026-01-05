import type LeafletMap from "$lib/components/LeafletMap.svelte";
import { currentUser, loggedInUser } from "$lib/runes.svelte";
import type { Category, MarkerLayer, MarkerSpec, PointOfInterest } from "$lib/types/types";
import { service } from "./service";
import { restoreSession } from "./session-utils";

export async function refreshCurrentUser() {
	const user = await service.getUser(loggedInUser._id);

	if (user) {
		currentUser.firstName = user.firstName;
		currentUser.lastName = user.lastName;
		currentUser.email = user.email;
		currentUser.role = user.role;
	}
}

export async function refreshMap(map: LeafletMap) {
	if (!loggedInUser.token) await restoreSession();

	const [pois, categories] = await Promise.all([service.getAllPOIs(), service.getAllCategories()]);

	const layers = prepareMarkerLayers(pois, categories);

	layers.forEach((layer) => {
		map.populateLayer(layer);
	});

	if (pois.length > 0) {
		const lastPOI = pois[pois.length - 1];
		if (lastPOI) map.moveTo(+lastPOI.location.lat, +lastPOI.location.lng);
	}
}

function prepareMarkerLayers(pois: PointOfInterest[], categories: Category[]): MarkerLayer[] {
	// lookup for category titles
	const categoryMap = new Map(categories.map((c) => [c._id, c.title]));

	const layers: Record<string, MarkerLayer> = {
		default: {
			isDefault: true,
			title: "default",
			markerSpecs: []
		}
	};

	pois.forEach((poi) => {
		const categoryTitle = categoryMap.get(poi.categoryID) || "No category";
		const spec = generateMarkerSpec(poi, categoryTitle);

		layers["default"].markerSpecs.push(spec);

		if (!layers[categoryTitle]) {
			layers[categoryTitle] = { isDefault: false, title: categoryTitle, markerSpecs: [] };
		}

		layers[categoryTitle].markerSpecs.push(spec);
	});

	return Object.values(layers);
}

function generateMarkerSpec(poi: PointOfInterest, categoryTitle: string): MarkerSpec {
	return {
		_id: poi._id,
		name: poi.name,
		description: poi.description,
		location: poi.location,
		category: categoryTitle
	};
}
