<script lang="ts">
	import LeafletMap from "$lib/components/LeafletMap.svelte";
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
	<div class="flex gap-2">
		<!-- Make extra component out of this card -->
		<div class="card grow p-3">
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
		<div class="card w-1/3">
			<div id="image-carousel" class="carousel slide">
				<div class="carousel-indicators">
					<button
						type="button"
						data-bs-target="#image-carousel"
						data-bs-slide-to="0"
						class="active"
						aria-current="true"
						aria-label="Slide 1"
					></button>
				</div>
				<div class="carousel-inner">
					<div class="carousel-item active flex items-center justify-center">
						{#if data.poi.img.url}
							<img
								src={data.poi.img.url}
								class="object-contain"
								alt="Image of {data.category.title}"
							/>
						{:else}
							<img
								src="https://placehold.co/600x400?text=No+images+found"
								class="object-contain"
								alt="Placeholder"
							/>
						{/if}
					</div>
				</div>
				<button
					class="carousel-control-prev"
					type="button"
					data-bs-target="#image-carousel"
					data-bs-slide="prev"
				>
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Previous</span>
				</button>
				<button
					class="carousel-control-next"
					type="button"
					data-bs-target="#image-carousel"
					data-bs-slide="next"
				>
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Next</span>
				</button>
			</div>
		</div>
	</div>
</div>
