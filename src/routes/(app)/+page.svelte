<script lang="ts">
	import LeafletMap from "$lib/components/LeafletMap.svelte";
	import { currentCategories, currentPOIs, selectedMarker } from "$lib/runes.svelte";
	import { refreshMap, refreshData } from "$lib/services/utils";
	import { onMount } from "svelte";
	import POIDetailCard from "./POIDetailCard.svelte";
	import Chart from "svelte-frappe-charts";
	import type { DataSet } from "$lib/types/types";
	import { computeByCategory, computeHeatmap } from "$lib/services/chart-utils";
	import { SvelteDate } from "svelte/reactivity";

	let map: LeafletMap;
	let totalByCategory: DataSet;
	let countByDayCreatedHeatmapData: Record<string, number>;

	onMount(async () => {
		await refreshData();
		await refreshMap(map, currentCategories.categories, currentPOIs.pois);

		totalByCategory = computeByCategory(currentCategories.categories, currentPOIs.pois);
		countByDayCreatedHeatmapData = computeHeatmap(currentPOIs.pois);
	});
</script>

<div class="flex flex-col gap-4">
	<div class="px-2">
		<h1>Explore and Map your World with Placemark</h1>
		<p>Discover local landmarks and hidden gems categorized by our community.</p>
	</div>
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
	<div class="px-2">
		<h2>Insights</h2>
		<p>Visualizing our growing database of points of interest.</p>
		<div class="container flex flex-col gap-2">
			<div class="row">
				<div class="col card p-2">
					<small class="text-muted">Points of Interest per Category</small>
					<Chart data={totalByCategory} type="pie" height={300} maxSlices={5} />
				</div>
			</div>
			<div class="row">
				<div class="col card flex flex-col p-2">
					<small class="text-muted">Point of Interest creation Heatmap</small>
					<div class="self-center justify-self-center pt-5">
						<Chart
							data={{
								dataPoints: countByDayCreatedHeatmapData,
								start: new SvelteDate(
									new SvelteDate().setFullYear(new SvelteDate().getFullYear() - 1)
								)
							}}
							type="heatmap"
							height={300}
						/>
					</div>
				</div>
			</div>
		</div>
		<div class="w-1/2"></div>
	</div>
</div>
