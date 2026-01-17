<script lang="ts">
	import { enhance } from "$app/forms";
	import { showToast } from "$lib/services/utils";
	import { ToastType } from "$lib/types/types";
	import type { ActionData } from "./$types";

	let { form }: { form: ActionData } = $props();

	let formVisible = $state(false);

	$effect(() => {
		if (form?.createCategory.success) {
			showToast(form?.createCategory.message, ToastType.Success, true);
			formVisible = false;
		} else if (form?.createCategory.message) {
			showToast(form?.createCategory.message, ToastType.Danger, true);
		}
	});

	async function toggleForm() {
		formVisible = !formVisible;
	}
</script>

<h4 class="font-bold">Categories</h4>
<div class="flex items-center justify-end">
	{#if formVisible}
		<form method="POST" action="?/createCategory" class="flex items-center gap-1" use:enhance>
			<div class="form-floating">
				<input
					type="text"
					class="form-control"
					id="category-title"
					name="categoryTitle"
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
