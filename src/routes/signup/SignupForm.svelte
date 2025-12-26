<script>
	import { goto } from "$app/navigation";
	import ErrorNotification from "$lib/components/ErrorNotification.svelte";
	import UserCredentials from "$lib/components/UserCredentials.svelte";
	import UserDetails from "$lib/components/UserDetails.svelte";

	let firstName = $state("");
	let lastName = $state("");
	let email = $state("");
	let password = $state("");
	let notification = $state("");

	async function signUp() {
		const success = false;

		if (success) {
			goto("/");
		} else {
			notification = "Registration failed. Please check the details and try again.";
		}
	}
</script>

{#if notification}
	<ErrorNotification {notification} />
{/if}
<div>
	<UserDetails bind:firstName bind:lastName />
	<UserCredentials bind:email bind:password />
	<button onclick={() => signUp()} class="btn btn-primary w-100 p-2">
		<strong>Account erstellen</strong>
	</button>
</div>
