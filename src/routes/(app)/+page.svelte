<script lang="ts">
	import LeafletMap from "$lib/components/LeafletMap.svelte";
	import { currentCategories, currentPOIs, selectedMarker } from "$lib/runes.svelte";
	import { refreshMap, refreshData } from "$lib/services/utils";
	import { onMount } from "svelte";
	import POIDetailCard from "./POIDetailCard.svelte";
	import Chart from "svelte-frappe-charts";

	let map: LeafletMap;
	let categoryNames: string[] = ["category"];
	let counts: number[] = [0];

	const totalByCategory = {
		labels: categoryNames,
		datasets: [
			{
				values: counts
			}
		]
	};

	onMount(async () => {
		await refreshData();
		await refreshMap(map, currentCategories.categories, currentPOIs.pois);

		// get set of unique category titles
		totalByCategory.labels = [
			...new Set(currentCategories.categories.map((category) => category.title))
		];
		// get number of POIs per category
		// for every category, get all POIs belonging to it and return the length
		totalByCategory.datasets[0].values = currentCategories.categories.map(
			(category) => currentPOIs.pois.filter((poi) => poi.categoryID === category._id).length
		);
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
		<div class="w-1/2">
			<div class="card p-2">
				<small class="text-muted">Points of Interest per Category</small>
				<Chart data={totalByCategory} type="pie" height={300} maxSlices={5} />
			</div>
		</div>
	</div>
</div>
