<script lang="ts">
	import { goto } from "$app/navigation";
	import ErrorNotification from "$lib/components/ErrorNotification.svelte";
	import UserCredentials from "$lib/components/UserCredentials.svelte";
	import UserDetails from "$lib/components/UserDetails.svelte";
	import { service } from "$lib/services/service";
	import { Role, type UserInfo } from "$lib/types/types";

	let firstName = $state("");
	let lastName = $state("");
	let email = $state("");
	let password = $state("");
	let notification = $state("");

	async function signup() {
		let user: UserInfo = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
			role: Role.User
		};
		const success = await service.signup(user);

		if (success) {
			goto("/login");
		} else {
			password = "";
			notification = "Registration failed. Please check the details and try again.";
		}
	}
</script>

{#if notification}
	<ErrorNotification {notification} />
{/if}
<form onsubmit={signup}>
	<UserDetails bind:firstName bind:lastName />
	<UserCredentials bind:email bind:password />
	<button type="submit" class="btn btn-primary w-100 p-2">
		<strong>Create Account</strong>
	</button>
</form>
