<script lang="ts">
	import { enhance } from "$app/forms";
	import { loggedInUser } from "$lib/runes.svelte";
	import { showToast } from "$lib/services/utils";
	import { ToastType } from "$lib/types/types";
	import type { ActionData } from "./$types";

	let { form }: { form: ActionData } = $props();

	$effect(() => {
		if (form?.deleteAccount?.success) {
			showToast(form?.deleteAccount.message, ToastType.Success, true);
		} else if (form?.deleteAccount?.message) {
			showToast(form?.deleteAccount.message, ToastType.Danger, true);
		}
	});
</script>

<div>
	<h5>
		<span class="font-bold text-red-600">Delete Account </span>
	</h5>
	<hr />
	<p>Once you delete your account, there is no going back.</p>
	<form method="POST" action="?/deleteAccount" use:enhance>
		<input type="hidden" name="id" value={loggedInUser._id} />
		<button type="submit" class="btn btn-danger">Delete account</button>
	</form>
</div>
