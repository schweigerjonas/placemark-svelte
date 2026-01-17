<script lang="ts">
	import CategoryItem from "$lib/components/CategoryItem.svelte";
	import LeafletMap from "$lib/components/LeafletMap.svelte";
	import { addImageForm, createPOIForm, currentUserData } from "$lib/runes.svelte";
	import { refreshMap } from "$lib/services/utils";
	import POIForm from "./POIForm.svelte";
	import CategoryForm from "./CategoryForm.svelte";
	import ImageForm from "./ImageForm.svelte";
	import type { PageProps } from "./$types";

	let { data, form }: PageProps = $props();

	let map: LeafletMap;

	let height = 60;

	$effect(() => {
		if (data.categories && data.pois && data.categoriesWithPOIs) {
			currentUserData.categories = data.categories;
			currentUserData.pois = data.pois;
			currentUserData.categoriesWithPOIs = data.categoriesWithPOIs;
		}
	});

	$effect(() => {
		if (map && currentUserData.pois.length > 0) {
			syncMap();
		}
	});

	async function syncMap() {
		await map.ready();
		refreshMap(map, currentUserData.categories, currentUserData.pois);
	}

	function handlePOICreated(lat: string, lng: string) {
		if (map) {
			map.moveTo(+lat, +lng, 11);
		}
	}
</script>

<div class="flex flex-col gap-3 px-2">
	<h3>My Collection</h3>
	<div class="flex gap-4" style="height: {height}vh;">
		<div class="w-2/3 grow">
			<LeafletMap {height} zoom={7} bind:this={map} />
		</div>
		<div class="flex w-1/3 flex-col gap-2">
			<CategoryForm {form} />
			<div class="flex flex-col gap-2 overflow-y-auto">
				{#if currentUserData.categoriesWithPOIs.length !== 0}
					{#each currentUserData.categoriesWithPOIs as category (category._id)}
						<div class="flex-none">
							<CategoryItem {category} pois={category.pois} />
						</div>
					{/each}
				{:else}
					<span>No categories added yet</span>
				{/if}
			</div>
		</div>
	</div>
	<div class="flex gap-3">
		{#if createPOIForm.visible}
			<div class="grow">
				<POIForm onCreate={handlePOICreated} />
			</div>
		{/if}
		{#if addImageForm.visible}
			<ImageForm />
		{/if}
	</div>
</div>
