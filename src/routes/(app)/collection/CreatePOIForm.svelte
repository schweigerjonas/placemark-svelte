<script lang="ts">
	import { createPOIForm } from "$lib/runes.svelte";

	let name = $state("");
	let description = $state("");
	let latitude = $state("");
	let longitude = $state("");

	async function create() {
		createPOIForm.visible = false;
	}

	function close() {
		createPOIForm.visible = false;
	}
</script>

<div class="card w-2/3 p-3">
	<h5>Create Point of Interest for Category "{createPOIForm.categoryTitle}"</h5>
	<form onsubmit={create} class="flex flex-col gap-3">
		<div class="w-2/3 grow">
			<label class="form-label font-bold" for="poi-name">Name</label>
			<input
				bind:value={name}
				type="text"
				class="form-control"
				id="poi-name"
				name="poi-name"
				placeholder="Name"
				required
			/>
		</div>
		<div class="grow">
			<label class="form-label font-bold" for="poi-description">Description</label>
			<textarea
				bind:value={description}
				class="form-control"
				rows="4"
				id="poi-description"
				name="poi-description"
				placeholder="Description"
				required
			></textarea>
		</div>
		<div class="w-2/3">
			<label class="form-label font-bold" for="location">Location</label>
			<div id="location" class="flex items-center gap-3">
				<input
					bind:value={latitude}
					type="text"
					class="form-control"
					id="poi-latitude"
					name="poi-latitude"
					placeholder="Latitude (e.g. 51.1657)"
				/>
				<input
					bind:value={longitude}
					type="text"
					class="form-control"
					id="poi-longitude"
					name="poi-longitude"
					placeholder="Longitude (e.g. 10.4515)"
				/>
			</div>
		</div>
		<div class="flex items-center justify-end gap-3">
			<button type="button" onclick={close} class="btn btn-secondary">Close</button>
			<button type="submit" class="btn btn-primary">Create</button>
		</div>
	</form>
</div>
