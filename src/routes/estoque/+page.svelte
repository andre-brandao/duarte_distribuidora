<script lang="ts">
	import type { PageData } from './$types';
	import DataTable from './data-table.svelte';
	export let data: PageData;

	const estoque = data.estoque.map((item) => {
		return {
			id: item.id,
			nome: item.var_produto?.produto?.nome + ' ' + item.var_produto?.categoria?.nome,
			quantidade: item.quantidade,
			tipo: item.var_produto?.categoria?.nome ?? 'Sem categoria'
		};
	});
</script>

<div class="mx-auto">
	<div class="p-4 sm:ml-64">
		<div class="rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
			<DataTable data={estoque} />
		</div>
	</div>
</div>
