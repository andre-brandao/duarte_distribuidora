<script lang="ts">
	import ModalEntradaEstoque from '$lib/components/modal/ModalEntradaEstoque.svelte';
	import type { PageData } from './$types';

	import SVChart from '$lib/SVChart.svelte';

	export let data: PageData;

	const estoque = data.estoque;
	const produto = {
		nome: estoque.var_produto?.produto?.nome,
		quantidade: estoque.quantidade,
	};

	const transacao_estoque = estoque.transacao_estoque;
	let chart_data = {
		labels: transacao_estoque.map((transacao) => {
			return new Date(transacao.created_at).toLocaleDateString('pt-BR');
		}),

		datasets: [
			{
				type: 'line',
				label: 'Quantidade em Estoque',
				data: transacao_estoque.map((transacao) => transacao.total_log),
				// light blue
				backgroundColor: 'rgba(0, 0, 255, 0.5)',
				borderColor: 'rgba(0, 0, 255, 1)',
			},
			{
				type: 'bar',
				label: 'Entrada',
				data: transacao_estoque.map((transacao) => {
					if (transacao.tipo === 'ENTRADA') {
						return transacao.quantidade;
					}
					return 0;
				}),
				// light green
				backgroundColor: 'rgba(0, 255, 0, 0.5)',
				borderColor: 'rgba(0, 255, 0, 1)',
			},
			{
				type: 'bar',
				label: 'Saida',
				data: transacao_estoque.map((transacao) => {
					if (transacao.tipo === 'SAIDA') {
						return transacao.quantidade;
					}
					return 0;
				}),
				// light red
				backgroundColor: 'rgba(255, 0, 0, 0.5)',
				borderColor: 'rgba(255, 0, 0, 1)',
			},
		],
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
					{#each estoque.transacao_estoque as transacao}
						<tr>
							<td class="px-6 py-4 text-sm text-gray-900"
								>Nº do pedido: {transacao.meta_data?.['pedido_id']}</td
							>
							<td class="px-6 py-4 text-sm text-gray-900"
								>{new Date(transacao.created_at)}</td
							>
							<td class="px-6 py-4 text-sm text-gray-900"
								>{transacao.quantidade} unidade</td
							>
						</tr>
					{/each}
				</tbody>
				<tfoot>
					<tr class="rounded-lg border-t border-gray-300 bg-gray-100">
						<td
							class="px-6 py-3 text-sm font-medium uppercase tracking-wider text-gray-700"
							colspan="3"
						>
							<div class="flex justify-between">
								<p>Total:</p>
								<p>{produto.quantidade} unidades</p>
							</div>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
		<div>
			<SVChart
			height={200}
			width={200}
				config={{
					type: 'line',
					data: chart_data,
					options: {
						plugins: {
							title: {
								text: 'Chart.js Combo Time Scale',
								display: true,
							},
						},
						// scales: {
						// 	// x: {
						// 	// 	type: 'time',
						// 	// 	display: true,
						// 	// 	offset: true,
						// 	// 	// ticks: {
						// 	// 	// 	source: 'data',
						// 	// 	// },
						// 	// 	// time: {
						// 	// 	// 	unit: 'day',
						// 	// 	// },
						// 	// },
						// },
					},
				}}
			/>
		</div>
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
