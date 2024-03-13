<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const clientes = data.clientes;
	const produtos = data.produtos;
</script>

<main class="container flex h-screen items-center justify-center gap-2">
	<div class="flex flex-col">
		<a href="/produtos" class="rounded-lg bg-red-300 p-3 hover:bg-primary"> BETA produtos </a>
		{#each clientes ?? [] as client}
			<a href="/cliente/{client.id}" class="hover:underline"> {client.nome}</a>
		{/each}
	</div>
	<div class="flex flex-col">
		<a href="/cliente" class="rounded-lg bg-blue-300 p-3 hover:bg-primary"> BETA cliente </a>
		{#each produtos ?? [] as prod}
			<a href="/produtos/{prod.id}" class="hover:underline">{prod.nome}</a>
		{/each}
	</div>
	<div>
		<a href="/estoque" class="rounded-lg bg-green-300 p-3 hover:bg-primary"> BETA estoque </a>

	</div>
</main>
