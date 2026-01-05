<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import "bootstrap-icons/font/bootstrap-icons.css";
	import { onMount } from "svelte";
	import SuccessToast from "$lib/components/SuccessToast.svelte";
	import { restoreSession } from "$lib/services/session-utils";

	let { children } = $props();

	onMount(async () => {
		await restoreSession();
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}

<SuccessToast />
