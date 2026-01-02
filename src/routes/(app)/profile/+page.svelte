<script lang="ts">
	import ChangePasswordForm from "./ChangePasswordForm.svelte";
	import ProfileInformation from "./ProfileInformation.svelte";
	import DeleteAccount from "./DeleteAccount.svelte";
	import { currentUser } from "$lib/runes.svelte";
</script>

<div class="flex flex-col gap-5">
	<ProfileInformation />
	<div>
		<h5>Role</h5>
		<hr />
		<div class="w-2/3">
			<label class="form-label font-bold" for="role">Role</label>
			<input
				bind:value={currentUser.role}
				type="text"
				class="form-control"
				id="role"
				name="role"
				placeholder="Role"
				disabled
			/>
		</div>
		<p class="pt-1.5 text-sm text-gray-600">You cannot change your own role.</p>
	</div>
	<ChangePasswordForm />
	<DeleteAccount />
</div>
