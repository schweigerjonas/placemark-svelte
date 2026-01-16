<script lang="ts">
	import { enhance } from "$app/forms";
	import ErrorNotification from "$lib/components/ErrorNotification.svelte";
	import UserCredentials from "$lib/components/UserCredentials.svelte";

	let notification = $state("");
</script>

{#if notification}
	<ErrorNotification {notification} />
{/if}
<div>
	<form method="POST" action="?/login" use:enhance>
		<UserCredentials />
		<button type="submit" class="btn btn-primary w-100 p-2">
			<strong>Log In</strong>
		</button>
	</form>
</div>
