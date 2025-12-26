<script>
	import SignupForm from "./SignupForm.svelte";
</script>

<div class="flex h-full items-center justify-center">
	<div class="card p-4 shadow">
		<div class="card-body flex flex-col gap-3">
			<div>
				<h1 class="card-title text-center">Create an account</h1>
				<p class="text-muted text-center text-xs">Welcome to Placemark!</p>
			</div>
			<SignupForm />
			<div class="mt-3 text-center">
				<small class="text-muted">
					Already have an account?
					<a href="/login" class="text-decoration-none">Log in</a>
				</small>
			</div>
		</div>
	</div>
</div>
