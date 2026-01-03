import type LeafletMap from "$lib/components/LeafletMap.svelte";
import { loggedInUser } from "$lib/runes.svelte";
import type { PointOfInterest } from "$lib/types/types";
import { service } from "./service";

export async function refreshMap(map: LeafletMap) {
	if (!loggedInUser.token) service.restoreSession();
	const pois = await service.getAllPOIs();

	pois.forEach((poi: PointOfInterest) => {
		map.addMarker(+poi.location.lat, +poi.location.lng, poi.name);
	});

	const lastPOI = pois[pois.length - 1];
	if (lastPOI) map.moveTo(+lastPOI.location.lat, +lastPOI.location.lng);
}
