<script>
	import { loggedInUser } from "$lib/runes.svelte";
</script>

<div class="bg-body-tertiary flex justify-center">
	<div class="w-7xl">
		<nav class="navbar navbar-expand-sm bg-body-tertiary">
			<div class="container-fluid">
				<a class="navbar-brand flex items-center gap-2" href="/">
					<span class="material-symbols-outlined"> globe_location_pin </span>
					<span class="font-bold">Placemark</span>
				</a>

				<div class="flex items-center justify-end gap-2">
					{#if loggedInUser.role === "ADMIN"}
						<a href="/admin-dashboard" class="btn btn-dark">
							<div class="flex items-center gap-2">
								<span class="material-symbols-outlined">admin_panel_settings</span>
								<span>Admin Dashboard</span>
							</div>
						</a>
					{/if}
					{#if loggedInUser.email}
						<a href="/collection" class="btn btn-primary">
							<div class="flex items-center gap-2">
								<span class="material-symbols-outlined">bookmarks</span>
								<span>My Collection</span>
							</div>
						</a>
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
						<a href="/login" class="btn btn-outline-primary">
							<div class="flex items-center gap-2">
								<span class="material-symbols-outlined">login</span>
								<span>Login</span>
							</div>
						</a>
					{/if}
				</div>
			</div>
		</nav>
	</div>
</div>
