<div class="flex h-full items-center justify-center">
	<div class="card p-4 shadow">
		<div class="card-body">
			<h2 class="card-title mb-4 text-center">Welcome back!</h2>
			<form method="POST">
				<div class="form-floating mb-3">
					<input
						type="text"
						class="form-control"
						id="username"
						name="username"
						placeholder="Username"
						required
					/>
					<label for="username" class="form-label">Username</label>
				</div>
				<div class="form-floating mb-3">
					<input
						type="password"
						class="form-control"
						id="password"
						name="password"
						placeholder="Password"
						required
					/>
					<label for="password" class="form-label">Password</label>
				</div>
				<button type="submit" class="btn btn-primary w-100">
					<strong>Log In</strong>
				</button>
			</form>
			<div class="mt-3 text-center">
				<small class="text-muted">
					Don't have an account?
					<a href="/signup" class="text-decoration-none">Sign Up</a>
				</small>
			</div>
		</div>
	</div>
</div>
