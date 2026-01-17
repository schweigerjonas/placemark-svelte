<script lang="ts">
	import { enhance } from "$app/forms";
	import { addImageForm } from "$lib/runes.svelte";
	import { showToast } from "$lib/services/utils";
	import { ToastType, type Image } from "$lib/types/types";
	import { type ActionData } from "../../routes/(app)/collection/$types";

	let { images = [] as Image[], canDelete = false, onDelete = () => {}, maxWidth = 600 } = $props();

	const validImages = $derived(images.filter((image) => image.url && image.url !== ""));
</script>

<div id="image-carousel" class="carousel slide" style="max-width: {maxWidth}px">
	<div class="carousel-indicators">
		{#each validImages as image, i (image.publicID)}
			<button
				type="button"
				data-bs-target="#image-carousel"
				data-bs-slide-to={i}
				class="active"
				aria-current="true"
				aria-label="Slide {i}"
			></button>
		{/each}
	</div>
	{#if validImages.length > 0}
		<div class="carousel-inner">
			{#each validImages as image, i (image.publicID)}
				<div class="carousel-item relative {i === 0 ? 'active' : ''}">
					<img
						src={image.url}
						class="object-contain"
						style="height: 400px; max-width: {maxWidth}px;"
						alt=""
					/>
					{#if canDelete}
						<!-- z-index ensures button is above control chevron buttons of carousel -->
						<form
							method="POST"
							action="?/deleteImage"
							use:enhance={() => {
								return async ({ result }) => {
									if (result.type === "success") {
										const data = result.data as ActionData;

										if (data && data?.deleteImage) {
											showToast(data.deleteImage.message, ToastType.Success, true);
										}

										await onDelete();
									} else if (result.type === "failure") {
										const data = result.data as ActionData;

										if (data && data?.deleteImage) {
											const message = data.deleteImage.message || "Deletion failed.";
											showToast(message, ToastType.Danger, true);
										}
									}
								};
							}}
						>
							<input type="hidden" name="poiId" value={addImageForm.poi._id} />
							<input type="hidden" name="imageId" value={image.publicID} />
							<button type="submit" class="absolute end-2 top-2 z-10">
								<span
									class="material-symbols-outlined rounded-lg bg-slate-50 p-2 text-red-500 hover:bg-red-50"
								>
									delete
								</span>
							</button>
						</form>
					{/if}
				</div>
			{/each}
		</div>
		{#if validImages.length > 1}
			<button
				class="carousel-control-prev"
				type="button"
				data-bs-target="#image-carousel"
				data-bs-slide="prev"
			>
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Previous</span>
			</button>
			<button
				class="carousel-control-next"
				type="button"
				data-bs-target="#image-carousel"
				data-bs-slide="next"
			>
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Next</span>
			</button>
		{/if}
	{:else}
		<div class="carousel-inner">
			<div class="carousel-item active relative">
				<img
					src="https://placehold.co/600x400?text=No+images+found"
					class="object-contain"
					alt="Placeholder"
				/>
			</div>
		</div>
	{/if}
</div>
