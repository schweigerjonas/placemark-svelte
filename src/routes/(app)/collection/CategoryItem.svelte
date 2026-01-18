<script lang="ts">
	import { enhance } from "$app/forms";
	import { addImageForm, createPOIForm } from "$lib/runes.svelte";
	import { showToast } from "$lib/services/utils";
	import { ToastType, type Category, type PointOfInterest } from "$lib/types/types";
	import type { ActionData } from "./$types";

	let {
		category = {} as Category,
		pois = [] as PointOfInterest[],
		form
	}: { category: Category; pois: PointOfInterest[]; form: ActionData } = $props();

	let isOpen = $state(false);

	$effect(() => {
		if (form?.deleteCategory?.success) {
			showToast(form.deleteCategory.message, ToastType.Success, true);
		} else if (form?.deleteCategory?.message) {
			showToast(form.deleteCategory.message, ToastType.Danger, true);
		}
	});

	$effect(() => {
		if (form?.deletePOI?.success) {
			showToast(form.deletePOI.message, ToastType.Success, true);
		} else if (form?.deletePOI?.message) {
			showToast(form.deletePOI.message, ToastType.Danger, true);
		}
	});

	function toggle() {
		isOpen = !isOpen;
	}

	function showCreatePOIForm() {
		createPOIForm.categoryId = category._id;
		createPOIForm.categoryTitle = category.title;
		createPOIForm.visible = true;
	}

	function showAddImageForm(poi: PointOfInterest) {
		addImageForm.poi = poi;
		addImageForm.visible = true;
	}
</script>

<div class="overflow-hidden border border-slate-200 bg-white shadow-sm">
	<div class="flex">
		<button class="flex grow items-center gap-2 p-3" onclick={toggle} aria-expanded={isOpen}>
			<span class="material-symbols-outlined {isOpen ? 'rotate-180' : ''}">arrow_drop_down</span>
			<span class="font-semibold text-slate-800">{category.title}</span>
		</button>
		<div class="flex gap-1">
			<button type="button" onclick={showCreatePOIForm}>
				<span class="material-symbols-outlined rounded-lg p-2 hover:bg-slate-50"
					>add_location_alt</span
				>
			</button>
			<form method="POST" action="?/deleteCategory" class="flex items-center" use:enhance>
				<input type="hidden" name="categoryId" value={category._id} />
				<input type="hidden" name="title" value={category.title} />
				<button class="pr-2" type="submit">
					<span class="material-symbols-outlined rounded-lg p-2 hover:bg-slate-50">delete</span>
				</button>
			</form>
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
						<button onclick={() => showAddImageForm(poi)} type="button">
							<span class="material-symbols-outlined rounded-lg p-2 hover:bg-slate-50"
								>add_photo_alternate</span
							>
						</button>
						<form method="POST" action="?/deletePOI" class="flex items-center" use:enhance>
							<input type="hidden" name="poiId" value={poi._id} />
							<input type="hidden" name="name" value={poi.name} />
							<button type="submit">
								<span class="material-symbols-outlined rounded-lg p-2 hover:bg-slate-50"
									>delete</span
								>
							</button>
						</form>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
