<script lang="ts">
	import { createPOIForm } from "$lib/runes.svelte";
	import { service } from "$lib/services/service";
	import { showToast } from "$lib/services/utils";
	import { ToastType, type PointOfInterestInfo } from "$lib/types/types";
	import { onDestroy } from "svelte";

	let name = $state("");
	let description = $state("");
	let latitude = $state("");
	let longitude = $state("");

	$effect(() => {
		if (createPOIForm.lat) latitude = createPOIForm.lat;
		if (createPOIForm.lng) longitude = createPOIForm.lng;
	});

	async function create() {
		const poi: PointOfInterestInfo = {
			name: name,
			description: description,
			location: {
				lat: latitude,
				lng: longitude
			},
			img: [
				{
					url: "",
					publicID: ""
				}
			]
		};
		const success = await service.createPOI(createPOIForm.categoryId, poi);

		if (success) {
			showToast(`Point of Interest "${poi.name}" created.`, ToastType.Success, true);
			clearForm();
			createPOIForm.visible = false;
		} else {
			showToast("Error: Could not create Point of Interest.", ToastType.Danger, true);
		}
	}

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

	onDestroy(() => {
		clearForm();
		createPOIForm.visible = false;
	});
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
