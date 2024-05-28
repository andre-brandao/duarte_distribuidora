<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const distribuidoras = data.distribuidoras;
</script>

<main class="flex items-center justify-center gap-3">
	{#each distribuidoras as item}
		<!-- content here -->
		<a
			href="/admin/estoque/{item.id}"
			class="rounded bg-primary p-3 hover:bg-secondary"
		>
			{item.nome}
		</a>
	{/each}
	<div>
		<a href="/admin/estoque/lancar">
			<Button>Lancar estoque</Button>
		</a>
	</div>
</main>
