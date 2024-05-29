<script lang="ts">
	import { lancarStore } from '$lib/stores/lancarStore';
	import CardTransferir from '$lib/components/card/CardLancarTransf.svelte';
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
	import * as Dialog from '$lib/components/ui/dialog';
	import type { PageData } from './$types.js';
	import { toast } from 'svelte-sonner';
	export let data: PageData;

	$lancarStore = [];

	const { distribuidoras } = data;

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

	let produtos_e: {
		created_at: string;
		distribuidora_id: number;
		id: number;
		quantidade: number;
		var_produto_id: number;
		var_produto: {
			id: number;
			produto: {
				created_at: string;
				id: number;
				nome: string;
			} | null;
			categoria: {
				nome: string;
			} | null;
		} | null;
	}[];

	async function transferirEstoque() {

	}

	async function getEstoque(id_distribuidora: number) {
		if (id_distribuidora === 0) {
			return;
		}
		const resp = await supabase
			.from('estoque')
			.select('*, var_produto(id, produto(*), categoria(nome))')
			.eq('distribuidora_id', id_distribuidora);
		//.gt('quantidade', 0);

		if (resp.error) {
			toast.error(resp.error.message);
			return;
		}
		produtos_e = resp.data;
		console.log(resp.data);
	}

	let distribuidoraSelecionada = 0;
	$: getEstoque(distribuidoraSelecionada);

	let search = '';

	$: produtosFiltrados =
		produtos_e?.filter((p) => {
			if (search.length === 0) {
				return true;
			}
			if (
				p.var_produto?.produto?.nome
					.toLocaleLowerCase()
					.includes(search.toLocaleLowerCase()) ||
				p.var_produto?.categoria?.nome
					.toLocaleLowerCase()
					.includes(search.toLocaleLowerCase())
			) {
				return true;
			}
			return false;
		}) ?? [];
</script>

<div class="">
	<div class="gap-0 py-1">
		<div class="items-center gap-0 pb-7">
			<h1 class="text-center text-4xl font-bold">
				Transferir estoque entre unidades
			</h1>
		</div>
	</div>
	<div class="grid grid-cols-1 justify-center gap-5 xl:grid-cols-2 xl:flex-row">
		<div class="col-auto rounded-lg border-4 border-opacity-50 p-4">
			<ul class="mb-4 text-center text-lg">
				{#if $lancarStore.length != 0}
					{#each $lancarStore as item}
						<div class="flex justify-center">
							<li class="py-2 font-bold">
								<!--Colocar quantidade-->
								({item.quantidade}x)
								{item.nome}
							</li>
							<button
								class="px-2"
								on:click={(e) =>
									lancarStore.removeTodosItemPedido()}
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

		<div class="col-auto flex h-auto flex-col justify-between gap-3">
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
					<Dialog.Trigger class="w-full">
						<button
							disabled={!distribuidoraSelecionada}
							class="group flex w-full content-center items-center justify-center rounded-lg bg-primary py-3 text-center font-semibold text-secondary-foreground shadow-sm transition ease-in-out hover:bg-yellow-300 disabled:bg-yellow-200 disabled:text-opacity-50"
							>ACESSAR PRODUTOS</button>
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
								{#each produtos_e as produto}
									<Button
										on:click={() => {
											search = produto.var_produto?.categoria?.nome ?? '';
										}}>{produto.var_produto?.categoria?.nome}</Button
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
									<CardTransferir {prod} />
								{/each}
							</div>
						</div>
					</Dialog.Content>
				</Dialog.Root>
			</div>
			<div>
				<Dialog.Root>
					<Dialog.Trigger class="w-full">
						<button
							disabled={!distribuidoraSelecionada}
							class="group flex w-full content-center items-center justify-center rounded-lg bg-primary py-3 text-center font-semibold text-secondary-foreground shadow-sm transition ease-in-out hover:bg-yellow-300 disabled:bg-yellow-200 disabled:text-opacity-50"
							>TRANSFERIR</button
						>
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
							<button class="w-full" on:click={transferirEstoque}>
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

<!-- <pre>
		{JSON.stringify($pedidoStore, null, 2)}
	</pre> -->
