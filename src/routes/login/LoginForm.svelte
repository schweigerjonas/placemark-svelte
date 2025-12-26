<script lang="ts">
	import { goto } from "$app/navigation";
	import ErrorNotification from "$lib/components/ErrorNotification.svelte";
	import UserCredentials from "$lib/components/UserCredentials.svelte";
	import { loggedInUser } from "$lib/runes.svelte";

	let email = $state("");
	let password = $state("");
	let notification = $state("");

	async function login() {
		const success = true;

		if (success) {
			loggedInUser.email = email;
			goto("/");
		} else {
			email = "";
			password = "";
			notification = "Invalid email or password.";
		}
	}
</script>

{#if notification}
	<ErrorNotification {notification} />
{/if}
<div>
	<UserCredentials bind:email bind:password />
	<button onclick={() => login()} class="btn btn-primary w-100 p-2">
		<strong>Log In</strong>
	</button>
</div>
