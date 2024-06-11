<script lang="ts">
	import ModalCliente from '$lib/components/modal/ModalCliente.svelte';
	import ButtonCliente from '$lib/components/buttons/ButtonCliente.svelte';
	import ButtonCardapio from '$lib/components/buttons/ButtonCardapio.svelte';
	import { onMount } from 'svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import ModalProduto from '$lib/components/modal/ModalProduto.svelte';
	import { Ban, Printer, DollarSign, CircleX, X } from 'lucide-svelte';
	import { pedidoStore } from '$lib/stores/pedidoStore.js';
	import * as Dialog from '$lib/components/ui/dialog';
	import { formatM } from '$lib/utils';
	import type { PageData } from '../$types.js';
	import { toast } from 'svelte-sonner';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { mask } from '$lib/utils';

	export let data: PageData;

	$pedidoStore = [];
	const { clientes, produtos: prod_temp } = data;

	const produtos = prod_temp.filter((p) => p.preco.length !== 0);

	let { supabase } = data;
	$: ({ supabase } = data);

	let { session } = data;

	let saldo_inicial = 0;

	const pedidos_caixa = {
		num_pedido: 0,
		datahora_pedido: '',
		isOpen: false,
		criado_por: session?.user.email ?? 'Desconhecido',
		valor_total: 0,
	};

	let cliente_selecionado: any = null;

	$: console.log(cliente_selecionado);

	async function realizarPedido(tipo_pagamento: string) {
		if (tipo_pagamento === 'fiado' && !cliente_selecionado) {
			toast.error('Selecione um cliente para realizar um pedido fiado');
			return;
		}

		if ($pedidoStore.length === 0) {
			toast.error('Adicione produtos ao pedido');
			return;
		}

		console.log(cliente_selecionado);

		const total_in_cents = $pedidoStore.reduce(
			(acc, p) => acc + p.unidade_em_cents * p.quantidade,
			0,
		);

		if (tipo_pagamento === 'fiado') {
			if (
				cliente_selecionado.credito_usado + total_in_cents >
				cliente_selecionado.credito_maximo
			) {
				toast.error('Cliente não possui crédito suficiente');
				return;
			} else {
				const { data: result_cliente, error: err_cliente } = await supabase
					.from('cliente')
					.update({
						credito_usado: cliente_selecionado.credito_usado + total_in_cents,
					})
					.eq('id', cliente_selecionado.id)
					.single();

				if (err_cliente) {
					toast.error(err_cliente.message);
					console.error(err_cliente);
					return;
				}
			}
		}
		// inserir na tabela pedido
		const pedidoToInsert = {
			cliente_id: cliente_selecionado?.id ?? null,
			total_in_cents,
			tipo: tipo_pagamento,
			meta_data: null,
			status: 'aberto',
			distribuidora_id: 1,
		};

		const { data: result_pedido, error: err_pedido } = await supabase
			.from('pedido')
			.insert(pedidoToInsert)
			.select('*')
			.single();

		if (err_pedido) {
			toast.error(err_pedido.message);
			console.error(err_pedido);
			return;
		}

		// inserir na tabela produto_pedido
		const produtosToInsert = $pedidoStore.map((p) => {
			return {
				pedido_id: result_pedido?.id, // mudar isso
				var_produto_id: p.var_produto_id,
				quantidade: p.quantidade, // e isso
				unidade_in_cents: p.unidade_em_cents,
				total_in_cents: p.quantidade * p.unidade_em_cents,
			};
		});

		const { error: err_pp } = await supabase
			.from('produto_pedido')
			.insert(produtosToInsert);
		if (err_pp) {
			toast.error(err_pp.message);
			console.error(err_pp);
			return;
		}

		toast.success('Pedido realizado com sucesso');
		$pedidoStore = [];
		cliente_selecionado = null;
	}

	function abrirCaixa() {
		pedidos_caixa.isOpen = true;
	}
	function fecharCaixa() {
		pedidos_caixa.isOpen = false;
	}
</script>

<div class="gap-0 py-1">
	<div class="items-center gap-0 pb-7">
		<h1 class="text-center text-4xl font-bold">Pedido no caixa</h1>
	</div>
	<p class="text-center">
		Saldo inicial do caixa: <span class="font-bold">R${saldo_inicial}</span>
	</p>
	<div class="flex items-center justify-center gap-0 pb-7">
		<div class="flex gap-4 py-4">
			{#if !pedidos_caixa.isOpen}
				<div class="grid grid-cols-2 items-center gap-4">
					<Label for="name" class="text-right"
						>Digite o saldo inicial do dia:</Label
					>
					<input
						class="col-span-1 mb-2 flex h-9 w-full rounded-md border border-gray-300 bg-transparent bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
						type="number"
						use:mask={{
							mask: 'money',
						}}
						bind:value={saldo_inicial}
					/>
				</div>
				<Button on:click={abrirCaixa} disabled={saldo_inicial === 0}
					>Abrir caixa</Button
				>
			{:else}
				<Button on:click={fecharCaixa}>Fechar caixa</Button>
			{/if}
		</div>
	</div>
</div>

{#if pedidos_caixa.isOpen}
	<div class="flex flex-col justify-center gap-4 xl:flex-row">
		<div class="col-auto flex h-auto flex-col justify-between">
			<div class="">
				<h2 class="text-3xl font-bold">Informações do pedido:</h2>
				<div
					class={`mt-5 w-full rounded-lg px-3 py-1 text-center font-bold text-white  ${pedidos_caixa.isOpen ? 'success-bg' : 'bg-red-500'}`}
				>
					{pedidos_caixa.isOpen ? 'Em aberto' : 'Fechado'}
				</div>
				<div class="mt-4">
					<p>
						Número do pedido <span class="font-bold text-primary">
							#{pedidos_caixa.num_pedido}</span
						>
					</p>
					<p>Pedido iniciado {pedidos_caixa.datahora_pedido}</p>
					<p>
						Criado por: <span class="font-bold text-primary"
							>{pedidos_caixa.criado_por}</span
						>
					</p>
				</div>
			</div>
			<div>
				{#if !cliente_selecionado}
					<ModalCliente
						{supabase}
						{clientes}
						on:cliente_selecionado={(e) => {
							const c = e.detail.cliente;
							cliente_selecionado = c;
						}}
					/>
				{:else}
					<div class="mb-3 flex items-center justify-between text-center">
						<h1 class="rounded border-2 p-1 px-3">
							{cliente_selecionado.nome}
						</h1>
						<Button on:click={() => (cliente_selecionado = null)}>
							<span class="flex items-center justify-center gap-3 text-center"
								>Remover cliente <CircleX /></span
							>
						</Button>
					</div>
				{/if}
				<button class="w-full" on:click={() => ($pedidoStore = [])}>
					<ButtonCardapio label={'CANCELAR'} Icon={Ban} href="#" />
				</button>
			</div>
		</div>

		<div class="col-auto rounded-lg border-4 border-opacity-50 p-4">
			<ul class="mb-4 text-center text-lg">
				{#each $pedidoStore as item}
					<div class="flex justify-center">
						<li class="py-2 font-bold">
							<!--Colocar quantidade-->
							({item.quantidade}x)
							{item.nome}

							<span class="text-green-500"
								>R${formatM(item.unidade_em_cents * item.quantidade)}</span
							>
						</li>
						<button
							class="px-2"
							on:click={(e) =>
								pedidoStore.removeTodosItemPedido(item.var_produto_id)}
							><X /></button
						>
					</div>
					<hr />
				{/each}
			</ul>
			<h2 class="mx-10 flex justify-center text-3xl font-bold">
				Preco total:&nbsp;<span class="text-green-500"
					>R${formatM(
						$pedidoStore.reduce(
							(acc, p) => acc + p.unidade_em_cents * p.quantidade,
							0,
						),
					)}</span
				>
			</h2>
		</div>

		<div class="col-auto flex h-auto w-96 flex-col justify-between">
			<div>
				<ModalProduto {produtos} />
				<p class="mb-2 mt-6">Observações sobre compra:</p>
				<Textarea
					placeholder="Anotar observacões..."
					id="message"
					class="mb-5 h-36"
				/>
			</div>
			<div>
				<div class="mb-4">
					<ButtonCardapio label={'IMPRIMIR'} Icon={Printer} />
				</div>
				<Dialog.Root>
					<Dialog.Trigger class="w-full">
						<ButtonCardapio
							label={'PAGAMENTO'}
							Icon={DollarSign}
						/></Dialog.Trigger
					>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Qual foi a forma de pagamento?</Dialog.Title>
							<Dialog.Description>
								Selecione a forma de pagamento do cliente, Pedidos Fiado
								necessitam de credito do cliente

								<div
									class=" my-3 flex flex-col items-center justify-center gap-3"
								>
									{#if cliente_selecionado}
										<button class="w-full" on:click={() => realizarPedido('fiado')}>
											<ButtonCardapio label={'FIADO'} Icon={DollarSign} />
										</button>
									{/if}
									<button class="w-full" on:click={() => realizarPedido('pago')}>
										<ButtonCardapio label={'PAGO'} Icon={DollarSign} />
									</button>
									<button class="w-full">
										<ButtonCardapio label={'DINHEIRO'} Icon={DollarSign} />
									</button>
								</div>
							</Dialog.Description>
						</Dialog.Header>
					</Dialog.Content>
				</Dialog.Root>
			</div>
		</div>
	</div>
{/if}

<!-- <pre>
		{JSON.stringify($pedidoStore, null, 2)}
	</pre> -->

<style>
	.success-bg {
		background-color: #04cf00;
	}
</style>
