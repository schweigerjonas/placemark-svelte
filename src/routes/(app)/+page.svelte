<script lang="ts">
	import LeafletMap from "$lib/components/LeafletMap.svelte";
	import { service } from "$lib/services/service";
	import type { PointOfInterest } from "$lib/types/types";
	import { onMount } from "svelte";

	let map: LeafletMap;

	onMount(async () => {
		const pois = await service.getAllPOIs();

		pois.forEach((poi: PointOfInterest) => {
			map.addMarker(+poi.location.lat, +poi.location.lng, poi.name);
		});

		const lastPOI = pois[pois.length - 1];

		if (lastPOI) map.moveTo(+lastPOI.location.lat, +lastPOI.location.lng);
	});
</script>

<div class="p-3">
	<div>
		<LeafletMap height={80} bind:this={map} />
	</div>
</div>
