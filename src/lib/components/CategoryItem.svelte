<script lang="ts">
	import type { Category, PointOfInterest } from "$lib/types/types";

	let { category = {} as Category, pois = [] as PointOfInterest[] } = $props();

	let isOpen = $state(false);

	function toggle() {
		isOpen = !isOpen;
	}
</script>

<div class="overflow-hidden border border-slate-200 bg-white shadow-sm">
	<div class="flex">
		<button class="flex grow items-center gap-2 p-3" onclick={toggle} aria-expanded={isOpen}>
			<span class="material-symbols-outlined {isOpen ? 'rotate-180' : ''}">arrow_drop_down</span>
			<span class="font-semibold text-slate-800">{category.title}</span>
		</button>
		<div class="flex gap-1">
			<button type="button">
				<span class="material-symbols-outlined rounded-lg p-2 hover:bg-slate-50"
					>add_location_alt</span
				>
			</button>
			<button class="pr-2" type="button">
				<span class="material-symbols-outlined rounded-lg p-2 hover:bg-slate-50">delete</span>
			</button>
		</div>
	</div>
	{#if isOpen}
		<div class="border-t border-slate-100 bg-slate-50/30">
			{#each pois as poi (poi._id)}
				<div
					class="flex items-center justify-between border-b border-slate-100 px-3 py-2 last:border-0"
				>
					<div>
						<span>{poi.name}</span>
					</div>
					<div class="flex gap-1">
						<button type="button">
							<span class="material-symbols-outlined rounded-lg p-2 hover:bg-slate-50"
								>add_photo_alternate</span
							>
						</button>
						<button type="button">
							<span class="material-symbols-outlined rounded-lg p-2 hover:bg-slate-50">delete</span>
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
