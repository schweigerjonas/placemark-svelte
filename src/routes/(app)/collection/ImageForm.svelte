<script lang="ts">
	import { addImageForm } from "$lib/runes.svelte";
	import { service } from "$lib/services/service";
	import { showToast } from "$lib/services/utils";
	import { ToastType, type Image, type PointOfInterest } from "$lib/types/types";
	import ImageCarousel from "../poi/[id]/ImageCarousel.svelte";

	let fileInput: HTMLInputElement;

	let images: Image[] = $state([]);

	$effect(() => {
		if (addImageForm.poi.img.publicID) {
			images = [addImageForm.poi.img];
		}
	});

	async function upload(e: Event) {
		e.preventDefault();

		if (fileInput && fileInput.files && fileInput.files[0]) {
			const file = fileInput.files[0];

			const success = await service.addImageToPOI(addImageForm.poi, file);

			if (success) {
				showToast("Image uploaded.", ToastType.Success, true);
				fileInput.value = "";
			}
		} else {
			showToast("Failed to upload image.", ToastType.Danger, true);
		}
	}

	async function close() {
		addImageForm.poi = {} as PointOfInterest;
		addImageForm.visible = false;
	}
</script>

<div class="card flex flex-col gap-3 p-3">
	<div>
		<div class="mb-3 flex justify-between gap-3">
			<h5 class="font-bold">Add Image to "{addImageForm.poi.name}"</h5>
			<button onclick={close} type="button" class="btn-close" aria-label="Clase add image form"
			></button>
		</div>
		<form onsubmit={upload} class="flex flex-col gap-3">
			<div>
				<label for="poi-image" class="form-label font-bold">Select Image</label>
				<input
					bind:this={fileInput}
					type="file"
					accept="image/*"
					class="form-control"
					id="poi-image"
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
		<ImageCarousel {images} canDelete={true} />
	</div>
</div>
