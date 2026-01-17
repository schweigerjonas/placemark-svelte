import type LeafletMap from "$lib/components/LeafletMap.svelte";
import {
	currentCategories,
	currentPOIs,
	currentUser,
	currentUserData,
	loggedInUser,
	toastData
} from "$lib/runes.svelte";
import type {
	Category,
	MarkerLayer,
	MarkerSpec,
	PointOfInterest,
	ToastType
} from "$lib/types/types";
import { service } from "./service";

export function clearState() {
	loggedInUser.name = "";
	loggedInUser.email = "";
	loggedInUser.role = "";
	loggedInUser.token = "";
	loggedInUser._id = "";

	currentUser.firstName = "";
	currentUser.lastName = "";
	currentUser.email = "";
	currentUser.role = "";

	currentCategories.categories = [];
	currentPOIs.pois = [];

	currentUserData.categories = [];
	currentUserData.pois = [];
	currentUserData.categoriesWithPOIs = [];
}

export function showToast(message: string, type: ToastType, visible: boolean) {
	toastData.message = message;
	toastData.type = type;
	toastData.visible = visible;
}

export async function refreshCurrentUser() {
	const user = await service.getUserById(loggedInUser._id, loggedInUser.token);

	if (user) {
		currentUser.firstName = user.firstName;
		currentUser.lastName = user.lastName;
		currentUser.email = user.email;
		currentUser.role = user.role;
	}
}

export async function refreshData() {
	[currentPOIs.pois, currentCategories.categories] = await Promise.all([
		service.getAllPOIs(),
		service.getAllCategories()
	]);
}

export async function refreshCurrentUserData() {
	currentUserData.categories = await service.getUserCategories(loggedInUser._id);

	// get POIs of all user categories
	const poiPromises = currentUserData.categories.map((category) =>
		service.getCategoryPOIs(category._id)
	);
	const results = await Promise.all(poiPromises); // resolves all promises in parallel
	currentUserData.pois = results.flat();

	currentUserData.categoriesWithPOIs = currentUserData.categories.map((category, i) => {
		return {
			...category,
			pois: results[i]
		};
	});
}

// Setup Maps with Layers
export async function refreshMap(map: LeafletMap, categories: Category[], pois: PointOfInterest[]) {
	// remove any existing overlays or controls
	map.clearLayers();

	const layers = prepareMarkerLayers(pois, categories);

	layers.forEach((layer) => {
		map.populateLayer(layer);
	});

	// leads to errors when refreshMap is run inside $effect rune because map can be undefined there
	// if (pois.length > 0) {
	// 	const lastPOI = pois[pois.length - 1];
	// 	if (lastPOI) map.moveTo(+lastPOI.location.lat, +lastPOI.location.lng);
	// }
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
