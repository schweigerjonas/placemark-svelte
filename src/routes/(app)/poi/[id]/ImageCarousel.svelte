<script lang="ts">
	import type { Image } from "$lib/types/types";

	let { images = [] as Image[] } = $props();
</script>

<div id="image-carousel" class="carousel slide">
	<div class="carousel-indicators">
		{#each images as image, i (image.publicID)}
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
	<div class="carousel-inner">
		{#each images as image, i (image.publicID)}
			<div class="carousel-item {i === 0 ? 'active' : ''}">
				{#if image.url}
					<img src={image.url} class="object-contain" alt="" />
				{:else}
					<img
						src="https://placehold.co/600x400?text=No+images+found"
						class="object-contain"
						alt="Placeholder"
					/>
				{/if}
			</div>
		{/each}
	</div>
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
</div>
