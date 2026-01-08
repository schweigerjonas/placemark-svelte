<script lang="ts">
	import LeafletMap from "$lib/components/LeafletMap.svelte";
	import { loggedInUser } from "$lib/runes.svelte";
	import { service } from "$lib/services/service";
	import { restoreSession } from "$lib/services/session-utils";
	import { refreshMap } from "$lib/services/utils";
	import type { Category, PointOfInterest } from "$lib/types/types";
	import { onMount } from "svelte";

	let map: LeafletMap;
	let categories: Category[];
	let pois: PointOfInterest[];

	onMount(async () => {
		if (!loggedInUser.token) await restoreSession();

		categories = await service.getUserCategories(loggedInUser._id);

		// get POIs of all user categories
		const poiPromises = categories.map((category) => service.getCategoryPOIs(category._id));
		const results = await Promise.all(poiPromises); // resolves all promises in parallel
		pois = results.flat();

		await refreshMap(map, categories, pois);
	});
</script>

<div class="flex flex-col gap-3">
	<h2>My Collection</h2>
	<div class="flex items-center">
		<div class="min-w-1/2 grow pl-2">
			<LeafletMap height={60} zoom={7} bind:this={map} />
		</div>
	</div>
</div>
