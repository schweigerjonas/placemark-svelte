<script lang="ts">
	import LeafletMap from "$lib/components/LeafletMap.svelte";
	import { selectedMarker } from "$lib/runes.svelte";
	import { refreshMap } from "$lib/services/utils";
	import { onMount } from "svelte";
	import POIDetailCard from "./POIDetailCard.svelte";
	import Chart from "svelte-frappe-charts";

	const chartData = {
		labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
		datasets: [
			{
				values: [10, 12, 3, 9, 8, 15, 9]
			}
		]
	};

	let map: LeafletMap;

	onMount(async () => {
		await refreshMap(map);
	});
</script>

<div class="flex flex-col gap-4">
	<div class="flex items-center gap-2">
		<div class="min-w-2/3 grow pl-2">
			<LeafletMap height={80} zoom={7} bind:this={map} />
		</div>
		<div class="pr-2">
			{#if selectedMarker.focused}
				<POIDetailCard />
			{/if}
		</div>
	</div>
	<div>
		<h3>Statistics</h3>
		<div class="w-1/2">
			<Chart data={chartData} type="pie" maxSlices={5} />
		</div>
	</div>
</div>
