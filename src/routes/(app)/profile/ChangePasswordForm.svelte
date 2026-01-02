<script lang="ts">
	import { goto } from "$app/navigation";
	import ErrorNotification from "$lib/components/ErrorNotification.svelte";
	import { currentUser, loggedInUser, toastData } from "$lib/runes.svelte";
	import { service } from "$lib/services/service";
	import { ToastType, type UserInfo } from "$lib/types/types";

	let oldPassword = $state("");
	let newPassword = $state("");
	let confirmPassword = $state("");
	let notification = $state("");

	async function updatePassword() {
		if (oldPassword !== currentUser.password) {
			notification = "Wrong password or invalid session.";
			oldPassword = "";
			newPassword = "";
			confirmPassword = "";

			return;
		}

		if (newPassword !== confirmPassword) {
			notification = "Passwords don't match.";
			oldPassword = "";
			newPassword = "";
			confirmPassword = "";

			return;
		}

		const updated = await service.updateUser(loggedInUser._id, {
			password: newPassword
		} as UserInfo);

		if (updated) {
			toastData.message = "Password updated.";
			toastData.type = ToastType.Success;
			toastData.visible = true;

			oldPassword = "";
			newPassword = "";
			confirmPassword = "";
			goto("/profile");
		} else {
			notification = "Something went wrong.";
			oldPassword = "";
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
			<label class="form-label font-bold" for="old-password">Old password</label>
			<input
				bind:value={oldPassword}
				type="password"
				class="form-control"
				id="old-password"
				name="old-password"
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
