<script lang="ts">
	import LeafletMap from "$lib/components/LeafletMap.svelte";
	import { currentCategories, currentPOIs, selectedMarker } from "$lib/runes.svelte";
	import { refreshMap } from "$lib/services/utils";
	import { onMount } from "svelte";
	import POIDetailCard from "./POIDetailCard.svelte";
	import Chart from "svelte-frappe-charts";
	import {
		computeByCategory,
		computeHeatmap,
		computeRollingMonthlyTrend
	} from "$lib/services/chart-utils";
	import { SvelteDate } from "svelte/reactivity";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();

	let mounted = $state(false);

	let map: LeafletMap;

	$effect(() => {
		currentCategories.categories = data.categories;
		currentPOIs.pois = data.pois;
	});

	let totalByCategory = $derived(computeByCategory(currentCategories.categories, currentPOIs.pois));
	let countByDayCreatedHeatmapData = $derived(computeHeatmap(currentPOIs.pois));
	let trendByMonth = $derived(computeRollingMonthlyTrend(currentPOIs.pois));

	onMount(async () => {
		await refreshMap(map, currentCategories.categories, currentPOIs.pois);

		mounted = true;
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
			<div class="row flex gap-2">
				<div class="col card p-2">
					<small class="text-muted">Points of Interest per Category</small>
					{#if mounted}
						<Chart data={totalByCategory} type="pie" height={300} maxSlices={5} />
					{:else}
						<div style="height: 300px;" class="flex items-center justify-center">
							<p>Loading Chart...</p>
						</div>
					{/if}
				</div>
				<div class="col card flex flex-col p-2">
					<small class="text-muted">Rolling Monthly Trend of Points of Interest Created</small>
					{#if mounted}
						<Chart data={trendByMonth} type="line" height={300} />
					{:else}
						<div style="height: 300px;" class="flex items-center justify-center">
							<p>Loading Chart...</p>
						</div>
					{/if}
				</div>
			</div>
			<div class="row">
				<div class="col card flex flex-col p-2">
					<small class="text-muted">Point of Interest Creation Heatmap</small>
					{#if mounted}
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
					{:else}
						<div style="height: 300px;" class="flex items-center justify-center">
							<p>Loading Chart...</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
		<div class="w-1/2"></div>
	</div>
</div>
