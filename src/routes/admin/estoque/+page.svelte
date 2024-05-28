<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const distribuidoras = data.distribuidoras;
</script>

<main class="flex items-center justify-center gap-3">
	<div class="flex flex-col gap-0 py-1">
		<div class="items-center gap-0 pb-7">
			<h1 class="text-center text-4xl font-bold">Unidades cadastradas</h1>
		</div>
		<div class="flex gap-2 justify-center">
			{#each distribuidoras as item}
				<a
					href="/admin/estoque/{item.id}"
					class="rounded bg-primary p-12 hover:bg-yellow-300 min-w-48 text-center"
				>
					{item.nome}
				</a>
			{/each}
		</div>
	</div>
</main>
