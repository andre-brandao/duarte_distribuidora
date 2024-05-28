<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const distribuidoras = data.distribuidoras;
</script>

<main class="flex justify-center items-center gap-3">
	{#each distribuidoras as item}
		<!-- content here -->
		<a href="/admin/estoque/{item.id}" class="rounded bg-primary hover:bg-secondary p-3">
			{item.nome}
		</a>
	{/each}
</main>
