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

export async function refreshData() {
	[currentPOIs.pois, currentCategories.categories] = await Promise.all([
		service.getAllPOIs(),
		service.getAllCategories()
	]);
}

// Setup Maps with Layers
export async function refreshMap(map: LeafletMap, categories: Category[], pois: PointOfInterest[]) {
	// remove any existing overlays or controls
	map.clearLayers();

	const layers = prepareMarkerLayers(pois, categories);

	layers.forEach((layer) => {
		map.populateLayer(layer);
	});
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
