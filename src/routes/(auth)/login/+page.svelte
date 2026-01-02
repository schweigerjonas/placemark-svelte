<script lang="ts">
	import LoginForm from "./LoginForm.svelte";
</script>

<div class="flex h-full items-center justify-center">
	<div class="card p-4 shadow">
		<div class="card-body flex flex-col gap-3">
			<div>
				<h1 class="card-title text-center">Welcome back!</h1>
				<p class="text-muted text-center text-xs">
					Enter your email and password to access your account.
				</p>
			</div>
			<LoginForm />
			<div class="mt-3 text-center">
				<small class="text-muted">
					Don't have an account?
					<a href="/signup" class="text-decoration-none">Sign Up</a>
				</small>
			</div>
		</div>
	</div>
</div>
