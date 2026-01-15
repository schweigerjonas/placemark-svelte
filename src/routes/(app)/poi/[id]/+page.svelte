<script lang="ts">
	import LeafletMap from "$lib/components/LeafletMap.svelte";
	import { refreshMap, refreshData } from "$lib/services/utils.js";
	import { onMount } from "svelte";
	import ImageCarousel from "./ImageCarousel.svelte";
	import POIInformation from "$lib/components/POIInformation.svelte";
	import { currentCategories, currentPOIs } from "$lib/runes.svelte.js";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();

	let terrainMap: LeafletMap;
	let satelliteMap: LeafletMap;

	onMount(async () => {
		await refreshData();

		await refreshMap(terrainMap, currentCategories.categories, currentPOIs.pois);
		terrainMap.moveTo(+data.poi.location.lat, +data.poi.location.lng);

		await refreshMap(satelliteMap, currentCategories.categories, currentPOIs.pois);
		satelliteMap.moveTo(+data.poi.location.lat, +data.poi.location.lng);
	});
</script>

<div class="flex flex-col gap-3">
	<div class="flex items-center justify-between">
		<h2>{data.poi.name}</h2>
		<div class="flex items-center py-1 text-xs">
			<div class="rounded-l-lg bg-neutral-500 pr-1 pl-2 text-white">Visibility</div>
			<div class="rounded-r-lg bg-neutral-700 pr-2 pl-1 text-white">public</div>
		</div>
	</div>
	<div class="flex items-center gap-2">
		<div class="w-1/2">
			<LeafletMap
				id="terrain-map"
				activeLayer="Terrain"
				height={60}
				zoom={7}
				bind:this={terrainMap}
			/>
		</div>
		<div class="w-1/2">
			<LeafletMap
				id="satellite-map"
				activeLayer="Satellite"
				height={60}
				zoom={13}
				bind:this={satelliteMap}
			/>
		</div>
	</div>
	<div class="flex gap-2">
		<div class="card grow p-3">
			<div class="card-body">
				<POIInformation {data} />
			</div>
		</div>
		<div class="card w-1/3">
			<ImageCarousel images={data.poi.img} />
		</div>
	</div>
</div>
