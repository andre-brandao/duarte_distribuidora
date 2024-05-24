<script lang="ts">
	import ModalEntradaEstoque from '$lib/components/modal/ModalEntradaEstoque.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const estoque = data.estoque;
	const produto = {
		nome: estoque.var_produto?.produto?.nome,
		quantidade: estoque.quantidade,
	};
</script>

<main class="container flex flex-col items-center justify-center">
	<div
		class="flex w-full items-center justify-between rounded-lg bg-gray-100 p-4"
	>
		<div>
			<p>
				Produto: <strong>{produto.nome}</strong>
			</p>
			<p>Quantidade em estoque: <strong>{produto.quantidade}</strong></p>
		</div>

		<ModalEntradaEstoque {produto} />
	</div>

	<div class="mt-6 grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
		<div class="max-h-[60vh] overflow-x-auto rounded-lg border border-gray-300">
			<table class="w-full leading-normal">
				<thead>
					<tr class="rounded-lg border-b border-gray-300 bg-gray-100">
						<th
							class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700"
							>Referencia (Numero do pedido)</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700"
							>DATA</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700"
							>QUANTIDADE</th
						>
					</tr>
				</thead>
				<tbody
					class="block max-h-[45vh] divide-y divide-gray-200 overflow-y-auto bg-white"
				>
					<tr>
						<td class="px-6 py-4 text-sm text-gray-900">Nº do pedido: 000</td>
						<td class="px-6 py-4 text-sm text-gray-900"
							>13:09:37 - 20/04/2024</td
						>
						<td class="px-6 py-4 text-sm text-gray-900">X unidade</td>
					</tr>
				</tbody>
				<tfoot>
					<tr class="rounded-lg border-t border-gray-300 bg-gray-100">
						<td
							class="px-6 py-3 text-sm font-medium uppercase tracking-wider text-gray-700"
							colspan="3"
						>
							<div class="flex justify-between">
								<p>Total:</p>
								<p>XX unidades</p>
							</div>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
		<div>GRAFICO</div>
	</div>
</main>

<!-- {#each estoque.transacao_estoque as transacao_estoque}
	<div>
		<p>{transacao_estoque.quantidade}</p>
		<p>{JSON.stringify(transacao_estoque.meta_data, null, 2)}</p>
	</div>
{/each} -->

<style>
	thead,
	tfoot {
		display: table;
		width: 100%;
	}

	tbody {
		display: block;
		height: calc(70vh - 4rem);
	}

	tbody tr {
		display: table;
		width: 100%;
		table-layout: fixed;
	}
</style>
