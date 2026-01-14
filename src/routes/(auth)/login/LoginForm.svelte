<script lang="ts">
	import { goto } from "$app/navigation";
	import ErrorNotification from "$lib/components/ErrorNotification.svelte";
	import UserCredentials from "$lib/components/UserCredentials.svelte";
	import { service } from "$lib/services/service";

	let email = $state("");
	let password = $state("");
	let notification = $state("");

	async function login() {
		let session = await service.login(email, password);

		if (session) {
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
	<form onsubmit={login}>
		<UserCredentials bind:email bind:password />
		<button type="submit" class="btn btn-primary w-100 p-2">
			<strong>Log In</strong>
		</button>
	</form>
</div>
