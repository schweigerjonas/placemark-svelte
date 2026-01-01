<script lang="ts">
	import { goto } from "$app/navigation";
	import ErrorNotification from "$lib/components/ErrorNotification.svelte";
	import { currentUser, loggedInUser, toastData } from "$lib/runes.svelte";
	import { service } from "$lib/services/service";
	import { ToastType, type UserInfo } from "$lib/types/types";

	let firstName = $state(currentUser.firstName);
	let lastName = $state(currentUser.lastName);
	let email = $state(currentUser.email);
	let notification = $state("");

	async function updateProfileInformation() {
		const updateDetails = {
			firstName: firstName,
			lastName: lastName,
			email: email
		};

		const updated = await service.updateUser(loggedInUser._id, updateDetails as UserInfo);

		if (updated) {
			toastData.message = "Profile information updated.";
			toastData.type = ToastType.Success;
			toastData.visible = true;
			goto("/profile");
		} else {
			notification = "Something went wrong.";
		}
	}
</script>

<div>
	<h5>Personal Information</h5>
	<hr />
	{#if notification}
		<ErrorNotification {notification} />
	{/if}
	<form onsubmit={updateProfileInformation}>
		<div class="align-center mb-3 flex w-2/3 gap-2">
			<div class="grow">
				<label class="form-label font-bold" for="first-name">First Name</label>
				<input
					bind:value={firstName}
					type="text"
					class="form-control"
					id="first-name"
					name="first-name"
					placeholder="First Name"
					required
				/>
			</div>
			<div class="grow">
				<label class="form-label font-bold" for="last-name">Last Name</label>
				<input
					bind:value={lastName}
					type="text"
					class="form-control"
					id="last-name"
					name="last-name"
					placeholder="Last Name"
					required
				/>
			</div>
		</div>
		<div class="mb-3 w-2/3">
			<label class="form-label font-bold" for="email">Email</label>
			<input
				bind:value={email}
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
