<script lang="ts">
	import { mask, formatDate,formatM } from '$lib/utils';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button';

	import SVChart from '$lib/SVChart.svelte';

	export let data: PageData;
	const { session } = data;
	let { supabase } = data;
	$: ({ supabase } = data);

	const estoque = data.estoque;
	const produto = {
		nome: estoque.var_produto?.produto?.nome,
		quantidade: estoque.quantidade,
		categoria: estoque.var_produto?.categoria?.nome,
	};

	let lancamentoNovoEstoque = {
		quantidade: 0,
		preco_custo: 0,
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

	async function transferirEstoque() {
		if (lancamentoNovoEstoque.quantidade < 1) {
			toast.error('Quantidade não pode ser menor que 1');
			return;
		}
		const estoqueParaLancar = {
			quantidade: lancamentoNovoEstoque.quantidade,
			estoque_id: data.estoqueID, // TODO: 'COLOCAR ESTOQUE ID AQUI',
			tipo: 'ENTRADA',
			meta_data: {
				user_id: session?.user.id,
				email: session?.user.email,
				preco_custo: lancamentoNovoEstoque.preco_custo, // TODO: 'COLOCAR PRECO DE CUSTO AQUI',
			},
		};
		const resp = await supabase
			.from('transacao_estoque')
			.insert(estoqueParaLancar);

		if (resp.error) {
			toast.error(resp.error.message);
			return;
		}

		toast.success('Estoque lançado com sucesso!');
	}
</script>

<main class="flex flex-col items-center justify-center">
	<div
		class="flex w-full items-center justify-between rounded-lg bg-gray-100 p-4"
	>
		<div>
			<p>
				Produto: <strong>{produto.nome} {produto.categoria}</strong>
			</p>
			<p>Quantidade em estoque: <strong>{produto.quantidade}</strong></p>
		</div>

		<Dialog.Root>
			<Dialog.Trigger>
				<Button>Lançar entrada</Button>
			</Dialog.Trigger>
			<Dialog.Content class="sm:max-w-[600px]">
				<Dialog.Header>
					<Dialog.Title>Entrada de estoque em {produto.nome}</Dialog.Title>
					<Dialog.Description>
						Digite a quantidade e clique em salvar!
					</Dialog.Description>
				</Dialog.Header>
				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="quantidade" class="text-right"
							>Entrada</Label
						>
						<Input
							type="number"
							id="estoque"
							bind:value={lancamentoNovoEstoque.quantidade}
							class="col-span-3"
						/>
						<Label for="price" class="text-right"
							>Preco de custo</Label
						>
						<input
							id="price"
							class="col-span-3 flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							type="number"
							use:mask={{
								mask: 'money',
							}}
							bind:value={lancamentoNovoEstoque.preco_custo}
						/>
					</div>
				</div>
				<Dialog.Footer>
					<Button on:click={transferirEstoque} type="submit">Salvar</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	</div>

	<div class="mt-6 grid w-full grid-cols-1 gap-4 xl:grid-cols-2">
		<div class="h-auto overflow-x-auto rounded-lg border border-gray-300">
			<table class="w-full leading-normal">
				<thead>
					<tr class="rounded-lg border-b border-gray-300 bg-gray-100">
						<th
							class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700"
							>Numero do pedido</th
						>
						<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
							Preco
						</th>
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
					class="block max-h-[60vh] divide-y divide-gray-200 overflow-y-auto bg-white"
				>
					{#each estoque.transacao_estoque as transacao}
					<tr class="{transacao.tipo === 'SAIDA' ? 'bg-red-100' : 'bg-green-100'}">
							<td class="px-6 py-4 text-sm text-gray-900">
								{#if transacao.tipo === 'SAIDA'}
									Nº do pedido: {transacao.meta_data?.['pedido_id']}
								{:else}
									{transacao.meta_data?.email.split('@')[0]}
								{/if}
							</td>
							<td class="px-6 py-4 text-sm text-gray-900">
								{#if transacao.tipo === 'SAIDA'}
								-
								{:else}
								R${formatM(transacao.meta_data?.preco_custo)}
								{/if}
							</td>
							<td class="px-6 py-4 text-sm text-gray-900"
								>{formatDate(transacao.created_at)}</td
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
				height={150}
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
