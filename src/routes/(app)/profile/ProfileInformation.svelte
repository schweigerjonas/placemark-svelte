<script lang="ts">
	import { enhance } from "$app/forms";
	import ErrorNotification from "$lib/components/ErrorNotification.svelte";
	import { loggedInUser } from "$lib/runes.svelte";
	import { showToast } from "$lib/services/utils";
	import { ToastType } from "$lib/types/types";
	import type { ActionData, PageServerData } from "./$types";

	let { data, form }: { data: PageServerData; form: ActionData } = $props();

	$effect(() => {
		if (form?.updateProfileInformation?.success) {
			showToast(form?.updateProfileInformation.message, ToastType.Success, true);
		}
	});
</script>

<div>
	<h5>Personal Information</h5>
	<hr />
	{#if form?.updateProfileInformation?.notification}
		<ErrorNotification notification={form?.updateProfileInformation.notification} />
	{/if}
	<form method="POST" action="?/updateProfileInformation" use:enhance>
		<input type="hidden" name="id" value={loggedInUser._id} />
		<div class="align-center mb-3 flex w-2/3 gap-2">
			<div class="grow">
				<label class="form-label font-bold" for="first-name">First Name</label>
				<input
					value={data.user?.firstName}
					type="text"
					class="form-control"
					id="first-name"
					name="firstName"
					placeholder="First Name"
					required
				/>
			</div>
			<div class="grow">
				<label class="form-label font-bold" for="last-name">Last Name</label>
				<input
					value={data.user?.lastName}
					type="text"
					class="form-control"
					id="last-name"
					name="lastName"
					placeholder="Last Name"
					required
				/>
			</div>
		</div>
		<div class="mb-3 w-2/3">
			<label class="form-label font-bold" for="email">Email</label>
			<input
				value={data.user?.email}
				type="text"
				class="form-control"
				id="email"
				name="email"
				placeholder="Email"
				required
			/>
		</div>
		<button type="submit" class="btn btn-success w-fit"> Update profile </button>
	</form>
</div>
