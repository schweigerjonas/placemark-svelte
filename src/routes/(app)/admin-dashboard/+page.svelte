<script lang="ts">
	import { loggedInUser } from "$lib/runes.svelte";
	import { showToast } from "$lib/services/utils";
	import { ToastType } from "$lib/types/types";
	import type { PageProps } from "./$types";
	import { enhance } from "$app/forms";

	let { data, form }: PageProps = $props();

	$effect(() => {
		if (form?.success) {
			showToast("User deleted.", ToastType.Success, true);
		} else if (form?.message) {
			showToast("Failed to delete user.", ToastType.Danger, true);
		}
	});
</script>

<div class="flex flex-col gap-3">
	<h3>Admin Dashboard</h3>
	<table class="table">
		<thead>
			<tr>
				<th scope="col">#</th>
				<th scope="col">Name</th>
				<th scope="col">Email</th>
				<th scope="col">Role</th>
				<th scope="col"></th>
			</tr>
		</thead>
		<tbody>
			{#each data.users as user, i (user._id)}
				{#if user._id !== loggedInUser._id}
					<tr>
						<td>{i}</td>
						<td>{user.firstName} {user.lastName}</td>
						<td>{user.email}</td>
						<td>{user.role}</td>
						<td>
							<form method="POST" action="?/deleteUser" use:enhance>
								<input type="hidden" name="id" value={user._id} />
								<button type="submit">
									<span
										class="material-symbols-outlined rounded-lg p-2 text-red-500 hover:bg-red-50"
									>
										delete
									</span>
								</button>
							</form>
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</div>
