<script lang="ts">
	import CardProduto from '$lib/components/card/CardProduto.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label';
	import ModalCliente from '$lib/components/modal/ModalCliente.svelte';
	import ButtonCliente from '$lib/components/buttons/ButtonCliente.svelte';
	import ButtonCardapio from '$lib/components/buttons/ButtonCardapio.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { onMount } from 'svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import ModalProduto from '$lib/components/modal/ModalProduto.svelte';
	import {
		Ban,
		Printer,
		PackageOpen,
		CircleX,
		X,
		ShoppingBasket,
	} from 'lucide-svelte';
	import { pedidoStore } from '$lib/stores/pedidoStore.js';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { PageData } from './$types.js';
	import { toast } from 'svelte-sonner';
	import CardTransferir from './CardTransferir.svelte';
	export let data: PageData;

	const { distribuidoras, produtos: prod_temp } = data;

	const produtos = prod_temp.filter((p) => p.preco.length !== 0);

	let { supabase } = data;
	$: ({ supabase } = data);

	let { session } = data;

	const pedidos_caixa = {
		num_pedido: 0,
		datahora_pedido: '',
		isOpen: true,
		criado_por: session?.user.email ?? 'Desconhecido',
		valor_total: 0,
	};

	let cliente_selecionado: any = null;

	$: console.log(cliente_selecionado);

	async function transferirEstoque(tipo_pagamento: string) {
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

	async function getEstoque(id_distribuidora: number) {
		if (id_distribuidora === 0) {
			return;
		}
		const resp = await supabase
			.from('estoque')
			.select(
				'*, var_produto(id, produto(*), preco(preco_in_cents,tipo), categoria(nome))',
			)
			.eq('distribuidora_id', id_distribuidora);
		//.gt('quantidade', 0);

		console.log(resp.data);
	}

	let distribuidoraSelecionada = 0;
	$: getEstoque(distribuidoraSelecionada);

	let search = '';

	$: produtosFiltrados = produtos.filter((p) => {
		if (search.length === 0) {
			return true;
		}
		if (
			p.produto?.nome
				.toLocaleLowerCase()
				.includes(search.toLocaleLowerCase()) ||
			p.categoria?.nome.toLocaleLowerCase().includes(search.toLocaleLowerCase())
		) {
			return true;
		}
		return false;
	});
</script>

<div class="">
	<div class="gap-0 py-1">
		<div class="items-center gap-0 pb-7">
			<h1 class="text-center text-4xl font-bold">
				Transferir estoque entre unidades
			</h1>
		</div>
	</div>
	<div class="grid grid-cols-1 justify-center xl:grid-cols-2 xl:flex-row">
		<div class="col-auto rounded-lg border-4 border-opacity-50 p-4">
			<ul class="mb-4 text-center text-lg">
				{#if $pedidoStore.length != 0}
					{#each $pedidoStore as item}
						<div class="flex justify-center">
							<li class="py-2 font-bold">
								<!--Colocar quantidade-->
								({item.quantidade}x)
								{item.nome}
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
				{:else}
					<p>Nenhum item adicionado para transferencia!</p>
				{/if}
			</ul>
		</div>

		<div class="col-auto flex h-auto flex-col justify-between gap-3 xl:ml-6">
			<div class="w-full">
				<div class="flex w-full gap-4">
					<div class="w-1/2">
						<Label class="mt-3 text-left">Saindo de qual unidade?</Label>
						<select
							bind:value={distribuidoraSelecionada}
							id="unidades"
							class="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
						>
							<option value="">Selecione</option>
							{#each distribuidoras as item}
								<option value={item.id}>{item.nome}</option>
							{/each}
						</select>
					</div>
					<div class="w-1/2">
						<Label class="mt-3 text-left">Entrada em qual unidade?</Label>
						<select
							id="unidades"
							class="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
						>
							<option value="">Selecione...</option>
							{#each distribuidoras as item}
								<option value={item.id}>{item.nome}</option>
							{/each}
						</select>
					</div>
				</div>
			</div>

			<hr />

			<div>
				<Dialog.Root>
					<Dialog.Trigger class="w-full" disabled={!distribuidoraSelecionada}>
						<ButtonCardapio label={'ACESSAR PRODUTOS'} Icon={ShoppingBasket} />
					</Dialog.Trigger>
					<Dialog.Content
						class="flex h-[600px] overflow-hidden sm:max-w-[900px]"
					>
						<div
							class="sticky top-0 flex h-full w-1/4 flex-col gap-2 bg-gray-100 p-4 text-center"
						>
							<Dialog.Title class="pb-2 text-center text-2xl"
								>Categorias:</Dialog.Title
							>
							<div class="flex flex-col gap-2">
								{#each produtos as categoria}
									<Button
										on:click={() => {
											search = categoria.categoria?.nome ?? '';
										}}>{categoria.categoria?.nome}</Button
									>
								{/each}
							</div>
						</div>
						<div class="w-3/4 overflow-y-auto">
							<Dialog.Header class="sticky top-0 bg-white">
								<div class="gap-0 pb-5">
									<div class=" flex items-center justify-between gap-0 pr-5">
										<Dialog.Title class="pr-3 text-center text-3xl"
											>Produtos:</Dialog.Title
										>
										<Input
											id="name"
											placeholder="Pesquisar produto..."
											class="col-span-1 h-auto w-auto py-1"
											bind:value={search}
										/>
									</div>
								</div>
							</Dialog.Header>
							<div class="grid pr-5">
								{#each produtosFiltrados as prod (prod.id)}
									{@const varejo =
										prod.preco.find((p) => (p.tipo = 'Varejo'))
											?.preco_in_cents ?? 0}
									<CardTransferir produto={prod} />
								{/each}
							</div>
						</div>
					</Dialog.Content>
				</Dialog.Root>
			</div>
			<div>
				<Dialog.Root>
					<Dialog.Trigger class="w-full" disabled={!distribuidoraSelecionada}>
						<ButtonCardapio label={'TRANSFERIR'} />
					</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Confirmar transferencia</Dialog.Title>
							<Dialog.Description>
								Confirme a transferencia de estoque
							</Dialog.Description>
						</Dialog.Header>
						<p class="text-center">
							Transferencia entre
							<span class="font-bold text-primary">
								Unidade {distribuidoraSelecionada}
							</span>
							para
							<span class="font-bold text-primary"> Unidade </span>
						</p>
						<div class="flex flex-col items-center justify-center gap-3">
							<button class="w-full">
								<ButtonCardapio
									label={'TRANSFERIR ESTOQUE'}
									Icon={PackageOpen}
								/>
							</button>
						</div>
					</Dialog.Content>
				</Dialog.Root>
			</div>
		</div>
	</div>
</div>

<pre>
		{JSON.stringify($pedidoStore, null, 2)}
	</pre>
