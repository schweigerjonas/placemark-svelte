<script lang="ts">
	import { currentPOI } from "$lib/runes.svelte";
	import type { PointOfInterest } from "$lib/types/types";

	let { height = 80 } = $props();

	function closeCard() {
		currentPOI.focused = false;
		currentPOI.poi = {} as PointOfInterest;
	}
</script>

<div class="card p-3" style="height: {height}vh">
	<div class="card-title flex items-center justify-between">
		<h5>{currentPOI.poi.name}</h5>
		<button onclick={() => closeCard()} class="btn">
			<span class="material-symbols-outlined">close</span>
		</button>
	</div>
	<div class="card-body flex flex-col gap-2">
		<div class="flex grow flex-col items-start gap-3">
			<div class="flex items-center gap-1">
				<span class="font-bold">Geolocation:</span>
				<div class="flex items-center py-1 text-xs">
					<div class="rounded-l-lg bg-blue-200 pr-1 pl-2">Lat</div>
					<div class="rounded-r-lg bg-blue-400 pr-2 pl-1">{currentPOI.poi.location.lat}</div>
				</div>
				<div class="flex items-center py-1 text-xs">
					<div class="rounded-l-lg bg-lime-200 pr-1 pl-2">Lng</div>
					<div class="rounded-r-lg bg-lime-400 pr-2 pl-1">{currentPOI.poi.location.lng}</div>
				</div>
			</div>
			<div class="flex flex-col gap-1">
				<span class="font-bold">Information:</span>
				<p>{currentPOI.poi.description}</p>
			</div>
		</div>
		<div class="w-100">
			<a href="/details/{currentPOI.poi._id}" class="btn btn-primary w-100 p-2">
				<strong>Explore Location</strong>
			</a>
		</div>
	</div>
</div>
