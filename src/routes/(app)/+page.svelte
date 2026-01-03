<script lang="ts">
	import LeafletMap from "$lib/components/LeafletMap.svelte";
	import { refreshMap } from "$lib/services/utils";
	import { onMount } from "svelte";

	let map: LeafletMap;

	onMount(async () => {
		await refreshMap(map);
	});
</script>

<div>
	<LeafletMap height={80} bind:this={map} />
</div>
