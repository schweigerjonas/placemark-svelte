<script lang="ts">
	import { service } from "$lib/services/service";
	import { showToast } from "$lib/services/utils";
	import { ToastType, type Category, type PointOfInterest } from "$lib/types/types";

	let { category = {} as Category, pois = [] as PointOfInterest[] } = $props();

	let isOpen = $state(false);

	function toggle() {
		isOpen = !isOpen;
	}

	async function deleteCategory(id: string, categoryTitle: string) {
		const success = await service.deleteCategoryById(id);

		if (success) {
			showToast(`Category "${categoryTitle}" deleted.`, ToastType.Success, true);
		} else {
			showToast("Something went wrong.", ToastType.Danger, true);
		}
	}

	async function deletePOI(id: string, poiName: string) {
		const success = await service.deletePOIById(id);

		if (success) {
			showToast(`Point of Interest "${poiName}" deleted.`, ToastType.Success, true);
		} else {
			showToast("Something went wrong.", ToastType.Danger, true);
		}
	}
</script>

<div class="overflow-hidden border border-slate-200 bg-white shadow-sm">
	<div class="flex">
		<button class="flex grow items-center gap-2 p-3" onclick={toggle} aria-expanded={isOpen}>
			<span class="material-symbols-outlined {isOpen ? 'rotate-180' : ''}">arrow_drop_down</span>
			<span class="font-semibold text-slate-800">{category.title}</span>
		</button>
		<div class="flex gap-1">
			<button type="button">
				<span class="material-symbols-outlined rounded-lg p-2 hover:bg-slate-50"
					>add_location_alt</span
				>
			</button>
			<button
				onclick={() => deleteCategory(category._id, category.title)}
				class="pr-2"
				type="button"
			>
				<span class="material-symbols-outlined rounded-lg p-2 hover:bg-slate-50">delete</span>
			</button>
		</div>
	</div>
	{#if isOpen}
		<div class="border-t border-slate-100 bg-slate-50/30">
			{#each pois as poi (poi._id)}
				<div
					class="flex items-center justify-between border-b border-slate-100 px-3 py-2 last:border-0"
				>
					<div class="flex items-center gap-2">
						<a href="/poi/{poi._id}" class="footer-link">{poi.name}</a>
						<span class="material-symbols-outlined no-underline">link</span>
					</div>
					<div class="flex gap-1">
						<button type="button">
							<span class="material-symbols-outlined rounded-lg p-2 hover:bg-slate-50"
								>add_photo_alternate</span
							>
						</button>
						<button onclick={() => deletePOI(poi._id, poi.name)} type="button">
							<span class="material-symbols-outlined rounded-lg p-2 hover:bg-slate-50">delete</span>
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
