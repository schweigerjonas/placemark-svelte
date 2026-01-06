<script lang="ts">
	import LeafletMap from "$lib/components/LeafletMap.svelte";
	import { selectedMarker } from "$lib/runes.svelte";
	import { refreshMap } from "$lib/services/utils.js";
	import { onMount } from "svelte";

	let { data } = $props();

	let map: LeafletMap;

	onMount(async () => {
		await refreshMap(map);
		map.moveTo(+data.poi.location.lat, +data.poi.location.lng);
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
	<div class="flex items-center">
		<div class="w-full grow">
			<LeafletMap activeLayer="Satellite" height={60} zoom={11} bind:this={map} />
		</div>
	</div>
	<div class="card p-3">
		<div class="card-body flex flex-col gap-2">
			<div class="flex grow flex-col items-start gap-3">
				<div class="flex gap-1">
					<span class="font-bold">Category:</span>
					<span>{data.category.title}</span>
				</div>
				<div class="flex items-center gap-1">
					<span class="font-bold">Geolocation:</span>
					<div class="flex items-center py-1 text-xs">
						<div class="rounded-l-lg bg-blue-200 pr-1 pl-2">Lat</div>
						<div class="rounded-r-lg bg-blue-400 pr-2 pl-1">{data.poi.location.lat}</div>
					</div>
					<div class="flex items-center py-1 text-xs">
						<div class="rounded-l-lg bg-lime-200 pr-1 pl-2">Lng</div>
						<div class="rounded-r-lg bg-lime-400 pr-2 pl-1">{data.poi.location.lng}</div>
					</div>
				</div>
				<div class="flex flex-col gap-1">
					<span class="font-bold">Information:</span>
					<p>{data.poi.description}</p>
				</div>
			</div>
		</div>
	</div>
</div>
