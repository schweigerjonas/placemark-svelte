<script lang="ts">
	import { enhance } from "$app/forms";
	import ErrorNotification from "$lib/components/ErrorNotification.svelte";
	import UserCredentials from "$lib/components/UserCredentials.svelte";
	import UserDetails from "$lib/components/UserDetails.svelte";
	import type { ActionData } from "./$types";

	let { form }: { form: ActionData } = $props();

	let notification = $state("");

	$effect(() => {
		if (form?.message) {
			notification = form?.message;
		}
	});
</script>

{#if notification}
	<ErrorNotification {notification} />
{/if}
<form method="POST" action="?/signup" use:enhance>
	<UserDetails />
	<UserCredentials />
	<button type="submit" class="btn btn-primary w-100 p-2">
		<strong>Create Account</strong>
	</button>
</form>
