<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import "bootstrap-icons/font/bootstrap-icons.css";
	import { type Snippet } from "svelte";
	import SuccessToast from "$lib/components/SuccessToast.svelte";
	import { loggedInUser } from "$lib/runes.svelte";
	import type { PageProps } from "./(app)/$types";

	let { children, data }: PageProps & { children: Snippet } = $props();

	$effect(() => {
		const session = data.session;

		if (session) {
			loggedInUser.name = session.name;
			loggedInUser.email = session.email;
			loggedInUser.role = session.role;
			loggedInUser.token = session.token;
			loggedInUser._id = session._id;
		} else {
			loggedInUser.name = "";
			loggedInUser.email = "";
			loggedInUser.role = "";
			loggedInUser.token = "";
			loggedInUser._id = "";
		}
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}

<SuccessToast />
