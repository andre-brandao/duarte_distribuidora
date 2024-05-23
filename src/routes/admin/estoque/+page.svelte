<script lang="ts">
	import type { PageData } from '../../estoque/$types';
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
	<div class="">
		<div class="">
			<DataTable data={estoque} />
		</div>
	</div>
</div>
