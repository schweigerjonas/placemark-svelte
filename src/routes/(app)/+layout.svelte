<script>
	import { loggedInUser } from "$lib/runes.svelte";

	let { children } = $props();
</script>

<nav class="navbar navbar-expand-sm bg-body-tertiary">
	<div class="container-fluid">
		<a class="navbar-brand flex items-center gap-2" href="/">
			<span class="material-symbols-outlined"> globe_location_pin </span>
			<span class="font-bold">Placemark</span>
		</a>

		<div class="flex items-center justify-end">
			{#if loggedInUser.role === "ADMIN"}
				<a href="/admin-dashboard" class="btn btn-light">Admin Dashboard</a>
			{/if}
			{#if loggedInUser.email}
				<div class="dropdown">
					<button
						class="btn btn-light flex items-center justify-center p-2"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						<div class="dropdown-toggle flex items-center justify-center gap-1.5">
							<span class="material-symbols-outlined"> account_circle </span>
							<span>{loggedInUser.email}</span>
						</div>
					</button>
					<ul class="dropdown-menu dropdown-menu-end">
						<li><a class="dropdown-item" href="/profile">Profile</a></li>
						<li><a class="dropdown-item" href="/logout">Logout</a></li>
					</ul>
				</div>
			{:else}
				<a href="/login" class="btn btn-secondary"> Login </a>
			{/if}
		</div>
	</div>
</nav>

<div class="m-3">
	{@render children()}
</div>
