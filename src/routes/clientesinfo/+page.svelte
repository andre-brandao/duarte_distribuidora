<script lang="ts">
	import type { PageData } from './$types';
	import DataTable from './data-table.svelte';

	export let data: PageData;

	let clientes = data.clientes;
</script>

<main class="p-4 sm:ml-64 mx-auto">
	<div class="gap-0 py-1">
		<div class="items-center gap-0 pb-7">
			<h1 class="text-center text-4xl font-bold">Informações de clientes</h1>
		</div>
	</div>
	{#if clientes}
		<div class="flex justify-center">
			<div class="overflow-x-auto">
				<DataTable {clientes} />
			</div>
		</div>
	{:else}
		<p>Nenhum cliente encontrado!</p>
	{/if}
</main>
