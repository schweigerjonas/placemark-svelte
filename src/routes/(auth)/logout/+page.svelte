<script lang="ts">
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
	import { clearState } from "$lib/services/utils";
	import { onMount } from "svelte";

	onMount(() => {
		clearState();
	});

	if (browser) goto("/");
</script>
