<script lang="ts">
	import LeafletMap from "$lib/components/LeafletMap.svelte";
	import POIDetailCard from "$lib/components/POIDetailCard.svelte";
	import { selectedMarker } from "$lib/runes.svelte";
	import { refreshMap } from "$lib/services/utils";
	import { onMount } from "svelte";

	let map: LeafletMap;

	onMount(async () => {
		await refreshMap(map);
	});
</script>

<div class="flex items-center gap-2">
	<div class="min-w-2/3 grow pl-2">
		<LeafletMap height={80} bind:this={map} />
	</div>
	<div class="pr-2">
		{#if selectedMarker.focused}
			<POIDetailCard />
		{/if}
	</div>
</div>
