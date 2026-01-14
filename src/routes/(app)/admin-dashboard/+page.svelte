<script lang="ts">
	import { loggedInUser } from "$lib/runes.svelte";
	import { service } from "$lib/services/service";
	import { restoreSession } from "$lib/services/session-utils";
	import { showToast } from "$lib/services/utils";
	import { ToastType, type User } from "$lib/types/types";
	import { onMount } from "svelte";

	let users: User[] = [];

	async function deleteUser(id: string) {
		const success = await service.deleteUser(id);

		if (success) {
			showToast("User deleted.", ToastType.Success, true);
			users = await service.getAllUsers();
		} else {
			showToast("Failed to delete user.", ToastType.Danger, true);
		}
	}

	onMount(async () => {
		if (!loggedInUser.token) await restoreSession();
		users = await service.getAllUsers();
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
			{#each users as user, i (user._id)}
				{#if user._id !== loggedInUser._id}
					<tr>
						<td>{i}</td>
						<td>{user.firstName} {user.lastName}</td>
						<td>{user.email}</td>
						<td>{user.role}</td>
						<td>
							<button onclick={() => deleteUser(user._id)} type="button">
								<span class="material-symbols-outlined rounded-lg p-2 text-red-500 hover:bg-red-50">
									delete
								</span>
							</button>
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</div>
