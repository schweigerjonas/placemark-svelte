<script lang="ts">
	import { goto } from "$app/navigation";
	import { service } from "$lib/services/service";

	service.clearSession();

	goto("/");
</script>
