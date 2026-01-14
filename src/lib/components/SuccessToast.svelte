<script lang="ts">
	import { toastData } from "$lib/runes.svelte";
	import { ToastType } from "$lib/types/types";
	import { onMount } from "svelte";

	let toastElement: HTMLElement;
	let toastInstance: bootstrap.Toast;

	let title = $state("Success");
	let message = $state("Action successfully finished.");

	onMount(async () => {
		if (toastElement) {
			toastInstance = new window.bootstrap.Toast(toastElement);
		}
	});

	$effect(() => {
		if (toastData.visible && toastInstance) {
			switch (toastData.type) {
				case "danger":
					title = "Error";
					break;
				case "info":
					title = "Info";
					break;
				default:
					title = "Success";
					break;
			}
			message = toastData.message;
			toastInstance.show();

			const handleHide = () => {
				toastData.message = "";
				toastData.type = ToastType.Success;
				toastData.visible = false;
			};
			toastElement.addEventListener("hidden.bs.toast", handleHide, { once: true });
		}
	});
</script>

<div class="toast-container position-fixed end-0 bottom-0 p-3">
	<div
		bind:this={toastElement}
		id="successToast"
		class="toast align-center border-0"
		role="alert"
		aria-live="assertive"
		aria-atomic="true"
	>
		<div class="toast-header flex justify-between">
			<strong class="text-{toastData.type}">{title}</strong>
			<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
		</div>
		<div class="toast-body">
			<span id="toastMessage">{message}</span>
		</div>
	</div>
</div>
