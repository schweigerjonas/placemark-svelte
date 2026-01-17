<script lang="ts">
	import ImageCarousel from "$lib/components/ImageCarousel.svelte";
	import { addImageForm, loggedInUser } from "$lib/runes.svelte";
	import { service } from "$lib/services/service";
	import { showToast } from "$lib/services/utils";
	import { ToastType, type PointOfInterest } from "$lib/types/types";
	import { onDestroy } from "svelte";
	import type { ActionData } from "./$types";
	import { enhance } from "$app/forms";

	let images = $derived(addImageForm.poi.img);

	let fileInput: HTMLInputElement;

	async function deleteImage(imageId: string) {
		const success = await service.deleteImageFromPOI(addImageForm.poi, imageId, loggedInUser.token);

		if (success) {
			showToast("Image deleted.", ToastType.Success, true);
			await updateImageFormPOI(addImageForm.poi);
		} else {
			showToast("Failed to delete image.", ToastType.Danger, true);
		}
	}

	async function updateImageFormPOI(poi: PointOfInterest) {
		const newPOI = await service.getPOIById(poi._id, loggedInUser.token);

		if (newPOI) {
			addImageForm.poi = newPOI;
		}
	}

	async function close() {
		addImageForm.poi = {} as PointOfInterest;
		addImageForm.visible = false;
	}

	onDestroy(() => close());
</script>

<div class="card flex flex-col gap-3 p-3">
	<div>
		<div class="mb-3 flex justify-between gap-3">
			<h5 class="font-bold">Add Image to "{addImageForm.poi.name}"</h5>
			<button onclick={close} type="button" class="btn-close" aria-label="Close add image form"
			></button>
		</div>
		<form
			method="POST"
			action="?/uploadImage"
			enctype="multipart/form-data"
			class="flex flex-col gap-3"
			use:enhance={() => {
				// use callback so toast only appears once
				return async ({ result }) => {
					if (result.type === "success") {
						const data = result.data as ActionData;

						if (data && data.uploadImage) {
							showToast(data.uploadImage.message, ToastType.Success, true);

							if (fileInput) {
								fileInput.value = "";
							}

							await updateImageFormPOI(addImageForm.poi);
						}
					} else if (result.type === "failure") {
						const data = result.data as ActionData;

						if (data && data.uploadImage) {
							const message = data.uploadImage.message || "Upload failed.";
							showToast(message, ToastType.Danger, true);
						}
					}
				};
			}}
		>
			<input type="hidden" name="poiId" value={addImageForm.poi._id} />
			<div>
				<label for="poi-image" class="form-label font-bold">Select Image</label>
				<input
					bind:this={fileInput}
					type="file"
					accept="image/*"
					class="form-control"
					id="poi-image"
					name="poiImage"
					required
				/>
			</div>
			<div class="flex items-center justify-end gap-2">
				<button type="button" onclick={close} class="btn btn-secondary">Cancel</button>
				<button type="submit" class="btn btn-primary">Upload</button>
			</div>
		</form>
	</div>
	<div>
		<ImageCarousel {images} canDelete={true} onDelete={(imageId: string) => deleteImage(imageId)} />
	</div>
</div>
