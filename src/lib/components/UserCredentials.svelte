<script lang="ts">
	let { email = $bindable(""), password = $bindable("") } = $props();
</script>

<div class="form-floating mb-3">
	<input
		type="text"
		class="form-control"
		id="email"
		bind:value={email}
		name="email"
		placeholder="Email"
		required
	/>
	<label for="email">Email</label>
</div>
<div class="form-floating mb-5">
	<input
		type="password"
		bind:value={password}
		class="form-control"
		id="password"
		name="password"
		placeholder="Password"
		required
	/>
	<label for="password">Password</label>
</div>
