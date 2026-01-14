<script lang="ts">
	import type { Image } from "$lib/types/types";

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
						<button
							onclick={() => onDelete(image.publicID)}
							type="button"
							class="absolute end-2 top-2 z-10"
						>
							<span
								class="material-symbols-outlined rounded-lg bg-slate-50 p-2 text-red-500 hover:bg-red-50"
							>
								delete
							</span>
						</button>
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
