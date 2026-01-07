<script lang="ts">
	import LeafletMap from "$lib/components/LeafletMap.svelte";
	import { refreshMap } from "$lib/services/utils";
	import { onMount } from "svelte";

	let map: LeafletMap;

	onMount(async () => {
		await refreshMap(map);
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
