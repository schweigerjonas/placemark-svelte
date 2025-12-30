<script lang="ts">
	import { goto } from "$app/navigation";
	import ErrorNotification from "$lib/components/ErrorNotification.svelte";
	import { loggedInUser } from "$lib/runes.svelte";
	import { service } from "$lib/services/service";

	let notification = $state("");

	async function deleteAccount() {
		let deleted = await service.deleteAccount(loggedInUser._id);

		if (deleted) {
			goto("/logout");
		} else {
			notification = "Something went wrong.";
		}
	}
</script>

<div class="flex flex-col gap-5">
	<div>
		<h5>Security</h5>
		<hr />
		<form>
			<div class="mb-3 w-2/3">
				<label class="form-label font-bold" for="old-password">Old password</label>
				<input
					type="password"
					class="form-control"
					id="old-password"
					name="old-password"
					required
				/>
			</div>
			<div class="mb-3 w-2/3">
				<label class="form-label font-bold" for="password">New password</label>
				<input type="password" class="form-control" id="password" name="password" required />
			</div>
			<div class="mb-4 w-2/3">
				<label class="form-label font-bold" for="confirm-password">Confirm new password</label>
				<input
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
</div>
