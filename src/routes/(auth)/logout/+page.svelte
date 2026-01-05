<script lang="ts">
	import { goto } from "$app/navigation";
	import { clearSession } from "$lib/services/session-utils";

	clearSession();

	goto("/");
</script>
