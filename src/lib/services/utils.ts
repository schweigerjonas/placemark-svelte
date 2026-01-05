import type LeafletMap from "$lib/components/LeafletMap.svelte";
import { loggedInUser } from "$lib/runes.svelte";
import type { MarkerLayer, MarkerSpec, PointOfInterest } from "$lib/types/types";
import { service } from "./service";

export async function refreshMap(map: LeafletMap) {
	if (!loggedInUser.token) service.restoreSession();

	const pois = await service.getAllPOIs();
	const categories = await service.getAllCategories();

	// lookup for category titles
	const categoryMap = new Map(categories.map((c) => [c._id, c.title]));

	const defaultLayer: MarkerLayer = {
		title: "default",
		markerSpecs: []
	};

	const layersByCategory: Record<string, MarkerSpec[]> = {};

	pois.forEach((poi) => {
		const categoryTitle = categoryMap.get(poi.categoryID) || "No category";
		const spec = generateMarkerSpec(poi, categoryTitle);

		defaultLayer.markerSpecs.push(spec);

		if (!layersByCategory[categoryTitle]) {
			layersByCategory[categoryTitle] = [];
		}

		layersByCategory[categoryTitle].push(spec);
	});

	const categoryLayers = Object.keys(layersByCategory).map((title) => ({
		title: title,
		markerSpecs: layersByCategory[title]
	}));

	const layers = [defaultLayer, ...categoryLayers];

	layers.forEach((layer) => {
		map.populateLayer(layer);
	});

	const lastPOI = pois[pois.length - 1];
	if (lastPOI) map.moveTo(+lastPOI.location.lat, +lastPOI.location.lng);
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
