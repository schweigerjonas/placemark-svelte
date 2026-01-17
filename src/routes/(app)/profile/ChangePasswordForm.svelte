<script lang="ts">
	import { enhance } from "$app/forms";
	import ErrorNotification from "$lib/components/ErrorNotification.svelte";
	import { loggedInUser } from "$lib/runes.svelte";
	import { showToast } from "$lib/services/utils";
	import { ToastType } from "$lib/types/types";
	import type { ActionData } from "./$types";

	let { form }: { form: ActionData } = $props();

	$effect(() => {
		if (form?.changePassword?.success) {
			showToast(form?.changePassword.message, ToastType.Success, true);
		}
	});
</script>

<div>
	<h5>Security</h5>
	<hr />
	{#if form?.changePassword?.notification}
		<ErrorNotification notification={form?.changePassword.notification} />
	{/if}
	<form method="POST" action="?/changePassword" use:enhance>
		<input type="hidden" name="id" value={loggedInUser._id} />
		<div class="mb-3 w-2/3">
			<label class="form-label font-bold" for="current-password">Current password</label>
			<input
				type="password"
				class="form-control"
				id="current-password"
				name="currentPassword"
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
				name="confirmPassword"
				required
			/>
		</div>
		<button type="submit" class="btn btn-outline-success w-fit"> Change Password </button>
	</form>
</div>
