<script lang="ts">
	import type { PageProps } from "./$types";
	import LoginForm from "./LoginForm.svelte";

	let { form }: PageProps = $props();
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
			<LoginForm {form} />

			<div class="my-3 flex items-center text-center">
				<hr class="flex-grow" />
				<span class="text-muted mx-2 text-xs">OR</span>
				<hr class="flex-grow" />
			</div>

			<a
				href="/login/github"
				class="btn btn-outline-dark flex w-100 items-center justify-center gap-2 p-2"
			>
				<i class="bi bi-github"></i>
				<span>Sign in with GitHub</span>
			</a>

			<div class="mt-3 text-center">
				<small class="text-muted">
					Don't have an account?
					<a href="/signup" class="text-decoration-none">Sign Up</a>
				</small>
			</div>
		</div>
	</div>
</div>
