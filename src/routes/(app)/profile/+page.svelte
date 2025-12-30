<script lang="ts">
	import { onMount } from "svelte";
	import ChangePasswordForm from "./ChangePasswordForm.svelte";
	import ProfileInformation from "./ProfileInformation.svelte";
	import { service } from "$lib/services/service";
	import { loggedInUser } from "$lib/runes.svelte";
	import type { User } from "$lib/types/types";
	import DeleteAccount from "./DeleteAccount.svelte";

	let user: User | null = $state(null);

	onMount(async () => {
		user = await service.getUser(loggedInUser._id);
	});
</script>

<div class="flex flex-col gap-5">
	<ProfileInformation />
	<ChangePasswordForm {user} />
	<DeleteAccount />
</div>
