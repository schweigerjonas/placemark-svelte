<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import { service } from "$lib/services/service";
	import { onMount } from "svelte";
	import SuccessToast from "$lib/components/SuccessToast.svelte";

	let { children } = $props();

	onMount(async () => {
		await service.restoreSession();
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}

<SuccessToast />
