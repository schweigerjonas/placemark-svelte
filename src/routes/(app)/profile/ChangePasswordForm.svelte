<script lang="ts">
	import { goto } from "$app/navigation";
	import ErrorNotification from "$lib/components/ErrorNotification.svelte";
	import { loggedInUser, toastData } from "$lib/runes.svelte";
	import { service } from "$lib/services/service";
	import { ToastType, type UserInfo } from "$lib/types/types";

	let currentPassword = $state("");
	let newPassword = $state("");
	let confirmPassword = $state("");
	let notification = $state("");

	async function updatePassword() {
		if (newPassword !== confirmPassword) {
			notification = "Passwords don't match.";
			currentPassword = "";
			newPassword = "";
			confirmPassword = "";

			return;
		}

		const updated = await service.updateUserPassword(loggedInUser._id, {
			password: newPassword,
			currentPassword: currentPassword
		} as UserInfo);

		if (updated) {
			toastData.message = "Password updated.";
			toastData.type = ToastType.Success;
			toastData.visible = true;

			currentPassword = "";
			newPassword = "";
			confirmPassword = "";
			goto("/profile");
		} else {
			notification = "Current password incorrect or server error.";
			currentPassword = "";
			newPassword = "";
			confirmPassword = "";
		}
	}
</script>

<div>
	<h5>Security</h5>
	<hr />
	{#if notification}
		<ErrorNotification {notification} />
	{/if}
	<form onsubmit={updatePassword}>
		<div class="mb-3 w-2/3">
			<label class="form-label font-bold" for="current-password">Current password</label>
			<input
				bind:value={currentPassword}
				type="password"
				class="form-control"
				id="current-password"
				name="current-password"
				required
			/>
		</div>
		<div class="mb-3 w-2/3">
			<label class="form-label font-bold" for="password">New password</label>
			<input
				bind:value={newPassword}
				type="password"
				class="form-control"
				id="password"
				name="password"
				required
			/>
		</div>
		<div class="mb-4 w-2/3">
			<label class="form-label font-bold" for="confirm-password">Confirm new password</label>
			<input
				bind:value={confirmPassword}
				type="password"
				class="form-control"
				id="confirm-password"
				name="confirm-password"
				required
			/>
		</div>
		<button type="submit" class="btn btn-outline-success w-fit"> Change Password </button>
	</form>
</div>
