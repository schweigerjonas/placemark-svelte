<script lang="ts">
	import { enhance } from "$app/forms";
	import { createPOIForm } from "$lib/runes.svelte";
	import { onDestroy } from "svelte";
	import type { ActionData } from "./$types";
	import { ToastType } from "$lib/types/types";
	import { showToast } from "$lib/services/utils";

	// callback after new POI gets created; used for moving to map marker in parent component
	let { onCreate, form }: { onCreate?: (lat: string, lng: string) => void; form: ActionData } =
		$props();

	let name = $state("");
	let description = $state("");
	let latitude = $state("");
	let longitude = $state("");

	$effect(() => {
		if (createPOIForm.lat) latitude = createPOIForm.lat;
		if (createPOIForm.lng) longitude = createPOIForm.lng;
	});

	$effect(() => {
		if (form?.createPOI?.success) {
			showToast(form?.createPOI.message, ToastType.Success, true);

			if (onCreate) {
				onCreate(form?.createPOI.lat, form?.createPOI.lng);
			}

			close();
		} else if (form?.createPOI?.message) {
			showToast(form?.createPOI.message, ToastType.Danger, true);
		}
	});

	function close() {
		clearForm();
		createPOIForm.visible = false;
	}

	function clearForm() {
		createPOIForm.categoryId = "";
		createPOIForm.categoryTitle = "";
		createPOIForm.lat = "";
		createPOIForm.lng = "";

		name = "";
		description = "";
		latitude = "";
		longitude = "";
	}

	onDestroy(() => close());
</script>

<div class="card p-3">
	<div class="flex justify-between">
		<h5>Create Point of Interest for Category "{createPOIForm.categoryTitle}"</h5>
		<button
			onclick={close}
			type="button"
			class="btn-close"
			aria-label="Close create point of interest form"
		></button>
	</div>
	<form method="POST" action="?/createPOI" class="flex flex-col gap-3" use:enhance>
		<input type="hidden" name="categoryId" value={createPOIForm.categoryId} />
		<div class="w-2/3 grow">
			<label class="form-label font-bold" for="poi-name">Name</label>
			<input
				bind:value={name}
				type="text"
				class="form-control"
				id="poi-name"
				name="poiName"
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
				name="poiDescription"
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
					name="poiLatitude"
					placeholder="Latitude (e.g. 51.1657)"
				/>
				<input
					bind:value={longitude}
					type="text"
					class="form-control"
					id="poi-longitude"
					name="poiLongitude"
					placeholder="Longitude (e.g. 10.4515)"
				/>
			</div>
		</div>
		<small class="text-muted mb-3">
			You can input the coordinates manually or by simply clicking on the desired location on the
			map.
		</small>
		<div class="flex items-center justify-end gap-3">
			<button type="button" onclick={close} class="btn btn-secondary">Close</button>
			<button type="submit" class="btn btn-primary">Create</button>
		</div>
	</form>
</div>
