<form>
	<div class="flex flex-col gap-5">
		<div>
			<h5>Personal Information</h5>
			<hr />
			<div class="align-center mb-3 flex w-2/3 gap-2">
				<div class="grow">
					<label class="form-label font-bold" for="first-name">First Name</label>
					<input
						type="text"
						class="form-control"
						id="first-name"
						name="first-name"
						placeholder="First Name"
						required
					/>
				</div>
				<div class="grow">
					<label class="form-label font-bold" for="last-name">Last Name</label>
					<input
						type="text"
						class="form-control"
						id="last-name"
						name="last-name"
						placeholder="Last Name"
						required
					/>
				</div>
			</div>
			<div class="w-2/3">
				<label class="form-label font-bold" for="email">Email</label>
				<input
					type="text"
					class="form-control"
					id="email"
					name="email"
					placeholder="Email"
					required
				/>
			</div>
		</div>
		<div>
			<h5>Role</h5>
			<hr />
			<div class="w-2/3">
				<label class="form-label font-bold" for="role">Role</label>
				<input type="text" class="form-control" id="role" name="role" placeholder="Role" disabled />
			</div>
			<p class="pt-1.5 text-sm text-gray-600">You cannot change your own role.</p>
		</div>
	</div>
	<button class="btn btn-success w-fit"> Update profile </button>
</form>
