<script lang="ts">
	let { firstName = $bindable(""), lastName = $bindable("") } = $props();
</script>

<div class="align-center mb-3 flex gap-2">
	<div class="form-floating">
		<input
			bind:value={firstName}
			type="text"
			class="form-control"
			id="first-name"
			name="first-name"
			placeholder="First Name"
			required
		/>
		<label for="first-name">First Name</label>
	</div>
	<div class="form-floating">
		<input
			bind:value={lastName}
			type="text"
			class="form-control"
			id="last-name"
			name="last-name"
			placeholder="Last Name"
			required
		/>
		<label for="first-name">Last Name</label>
	</div>
</div>
