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
							<span>{loggedInUser.email}</span>
						</div>
					</button>
					<ul class="dropdown-menu dropdown-menu-end">
						<li>
							<a class="dropdown-item" href="/profile">
								<div class="flex items-center gap-2">
									<span class="material-symbols-outlined">account_circle</span>
									<span>Profile</span>
								</div>
							</a>
						</li>
						<li>
							<a class="dropdown-item" href="/logout">
								<div class="flex items-center gap-2">
									<span class="material-symbols-outlined">logout</span>
									<span>Logout</span>
								</div>
							</a>
						</li>
					</ul>
				</div>
			{:else}
				<a href="/login" class="btn btn-secondary"> Login </a>
			{/if}
		</div>
	</div>
</nav>

<main class="flex flex-1 justify-center">
	<div class="flex w-7xl flex-col py-3">
		{@render children()}
	</div>
</main>

<footer class="bg-body-tertiary px-3 py-2">
	<div class="flex items-center justify-center gap-2">
		<span>© 2026 Placemark</span>
		<div class="vr"></div>
		<div class="flex items-center gap-2">
			<a
				href="https://github.com/schweigerjonas/placemark-svelte"
				target="_blank"
				rel="noopener noreferrer"
				class=""
			>
				<div class="flex items-center gap-1.5">
					<i class="bi bi-github"></i>
					<span class="text-xs">Frontend</span>
				</div>
			</a>
			<a
				href="https://github.com/schweigerjonas/placemark-core"
				target="_blank"
				rel="noopener noreferrer"
				class=""
			>
				<div class="flex items-center gap-1.5">
					<i class="bi bi-github"></i>
					<span class="text-xs">Backend</span>
				</div>
			</a>
		</div>
	</div>
</footer>
