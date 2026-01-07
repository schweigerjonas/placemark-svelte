<script>
	import Footer from "./Footer.svelte";
	import Navbar from "./Navbar.svelte";

	let { children } = $props();
</script>

<Navbar />
<main class="flex flex-1 justify-center">
	<div class="flex w-7xl flex-col py-3">
		{@render children()}
	</div>
</main>
<Footer />
