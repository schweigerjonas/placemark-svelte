<script lang="ts">
	import { clearState } from "$lib/services/utils";
	import { onMount } from "svelte";

	onMount(() => {
		clearState();
	});
</script>
