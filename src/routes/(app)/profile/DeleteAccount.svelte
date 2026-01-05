<script lang="ts">
	import { goto } from "$app/navigation";
	import ErrorNotification from "$lib/components/ErrorNotification.svelte";
	import { loggedInUser, toastData } from "$lib/runes.svelte";
	import { service } from "$lib/services/service";
	import { ToastType } from "$lib/types/types";

	let notification = $state("");

	async function deleteAccount() {
		let deleted = await service.deleteUser(loggedInUser._id);

		if (deleted) {
			toastData.message = "Account deleted.";
			toastData.type = ToastType.Success;
			toastData.visible = true;
			goto("/logout");
		} else {
			notification = "Something went wrong.";
		}
	}
</script>

<div>
	<h5>
		<span class="font-bold text-red-600">Delete Account </span>
	</h5>
	<hr />
	<p>Once you delete your account, there is no going back.</p>
	<button onclick={() => deleteAccount()} class="btn btn-danger">Delete account</button>
	{#if notification}
		<ErrorNotification {notification} />
	{/if}
</div>
