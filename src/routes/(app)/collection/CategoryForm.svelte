<script lang="ts">
	import { loggedInUser } from "$lib/runes.svelte";
	import { service } from "$lib/services/service";
	import { showToast } from "$lib/services/utils";
	import { ToastType, type CategoryInfo } from "$lib/types/types";

	let formVisible = $state(false);
	let title = $state("");

	async function toggleForm() {
		formVisible = !formVisible;
	}

	async function create() {
		const category: CategoryInfo = {
			title: title,
			img: {
				url: "",
				publicID: ""
			}
		};
		const success = await service.createCategory(loggedInUser._id, category);

		if (success) {
			showToast(`Category "${category.title}" created.`, ToastType.Success, true);
			title = "";
			formVisible = false;
		} else {
			showToast("Error: Could not create category.", ToastType.Danger, true);
		}
	}
</script>

<h4 class="font-bold">Categories</h4>
<div class="flex items-center justify-end">
	{#if formVisible}
		<form onsubmit={create} class="flex items-center gap-1">
			<div class="form-floating">
				<input
					bind:value={title}
					type="text"
					class="form-control"
					id="category-title"
					name="category-title"
					placeholder="Title"
					required
				/>
				<label for="category-title">Title</label>
			</div>
			<button onclick={() => toggleForm()} type="button">
				<span class="material-symbols-outlined rounded-lg p-2 text-sm text-red-500 hover:bg-red-50"
					>close</span
				>
			</button>
			<button type="submit">
				<span
					class="material-symbols-outlined btn-success rounded-lg p-2 text-sm text-green-500 hover:bg-green-50"
					>check</span
				>
			</button>
		</form>
	{:else}
		<button onclick={() => toggleForm()}>
			<span class="material-symbols-outlined rounded-lg p-2 hover:bg-slate-50">add_circle</span>
		</button>
	{/if}
</div>
