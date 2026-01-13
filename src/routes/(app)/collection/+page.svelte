<script lang="ts">
	import CategoryItem from "$lib/components/CategoryItem.svelte";
	import LeafletMap from "$lib/components/LeafletMap.svelte";
	import { createPOIForm, currentUserData, loggedInUser } from "$lib/runes.svelte";
	import { restoreSession } from "$lib/services/session-utils";
	import { refreshCurrentUserData, refreshMap } from "$lib/services/utils";
	import { onMount } from "svelte";
	import CreatePOIForm from "./CreatePOIForm.svelte";
	import CreateCategoryForm from "./CreateCategoryForm.svelte";

	let map: LeafletMap;

	let height = 60;

	$effect(() => {
		if (map && currentUserData.pois.length > 0) {
			refreshMap(map, currentUserData.categories, currentUserData.pois);
		}
	});

	onMount(async () => {
		if (!loggedInUser.token) await restoreSession();
		await refreshCurrentUserData();
	});
</script>

<div class="flex flex-col gap-3 px-2">
	<h3>My Collection</h3>
	<div class="flex gap-4" style="height: {height}vh;">
		<div class="w-2/3 grow">
			<LeafletMap {height} zoom={7} bind:this={map} />
		</div>
		<div class="flex w-1/3 flex-col gap-2">
			<CreateCategoryForm />
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
	<div>
		{#if createPOIForm.visible}
			<CreatePOIForm />
		{/if}
	</div>
</div>
