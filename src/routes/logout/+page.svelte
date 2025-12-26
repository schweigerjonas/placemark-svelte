<script lang="ts">
	import { goto } from "$app/navigation";
	import { loggedInUser } from "$lib/runes.svelte";

	loggedInUser.name = "";
	loggedInUser.email = "";
	loggedInUser.role = "";
	loggedInUser.token = "";
	loggedInUser._id = "";

	goto("/");
</script>
