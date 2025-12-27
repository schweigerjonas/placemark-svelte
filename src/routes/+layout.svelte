<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import { loggedInUser } from "$lib/runes.svelte";
	import { browser } from "$app/environment";

	let { children } = $props();

	if (browser) {
		const savedLoggedInUser = localStorage.placemarkSession;
		if (savedLoggedInUser) {
			const session = JSON.parse(savedLoggedInUser);
			loggedInUser.name = session.name;
			loggedInUser.email = session.email;
			loggedInUser.role = session.role;
			loggedInUser.token = session.token;
			loggedInUser._id = session._id;
		}
	}
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
