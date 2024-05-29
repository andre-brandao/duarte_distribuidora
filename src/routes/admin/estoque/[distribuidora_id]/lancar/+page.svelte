<script lang="ts">
	import { lancarStore } from './lancarStore';
	import ModalProduto from '$lib/components/modal/ModalProduto.svelte';
	import { Label } from '$lib/components/ui/label';
	import ButtonCardapio from '$lib/components/buttons/ButtonCardapio.svelte';
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
	import { mask } from '$lib/utils';
	import Button from '$lib/components/ui/button/button.svelte';
	import CardLancar from './CardLancar.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	export let data: PageData;

	const { distribuidoras } = data;

	const estoques = data.estoques;

	let { supabase } = data;
	$: ({ supabase } = data);

	let { session } = data;

	let cliente_selecionado: any = null;

	$: console.log(cliente_selecionado);

	async function transferirEstoque() {
		const estoqueParaLancar = $lancarStore.map((p) => {
			return {
				quantidade: p.quantidade,
				estoque_id: p.estoque_id, // TODO: 'COLOCAR ESTOQUE ID AQUI',
				tipo: 'ENTRADA',
				meta_data: {
					user_id: session?.user.id,
					email: session?.user.email,
					preco_custo: p.preco_custo, // TODO: 'COLOCAR PRECO DE CUSTO AQUI',
				},
			};
		});
		const resp = await supabase
			.from('transacao_estoque')
			.insert(estoqueParaLancar);

		if (resp.error) {
			toast.error(resp.error.message);
			return;
		}

		toast.success('Estoque lancado com sucesso!');
	}
	let search = '';
</script>

<div class="">
	<div class="gap-0 py-1">
		<div class="items-center gap-0 pb-7">
			<h1 class="text-center text-4xl font-bold">Lancar estoque</h1>
		</div>
	</div>
	<div class="grid grid-cols-1 justify-center gap-5 xl:grid-cols-2 xl:flex-row">
		<div class="col-auto rounded-lg border-4 border-opacity-50 p-4">
			<ul class="mb-4 text-center text-lg">
				{#if $lancarStore.length != 0}
					{#each $lancarStore as item}
						<div class="flex items-center justify-between gap-3">
							<li class="py-3 font-bold">
								<!--Colocar quantidade-->
								({item.quantidade}x)
								{item.nome}
							</li>
							<div class="flex items-center gap-3">
								<Label for="custo">Preco de custo:</Label>
								<input
									class=" flex h-9 w-24 rounded-md border border-gray-300 bg-transparent bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
									type="number"
									use:mask={{
										mask: 'money',
									}}
								/>
								<button
									class="px-2"
									on:click={(e) =>
										lancarStore.removeTodosItemPedido(item.estoque_id)}
									><X /></button
								>
							</div>
						</div>
						<hr />
					{/each}
				{:else}
					<p>Nenhum item adicionado para lancamento!</p>
				{/if}
			</ul>
		</div>

		<div class="col-auto flex h-auto flex-col justify-between gap-3">
			<!-- <div class="w-full">
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
			</div> -->

			<div>
				<Dialog.Root>
					<Dialog.Trigger class="w-full">
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
								{#each estoques as e}
									{@const var_produto = e.var_produto}
									<Button
										on:click={() => {
											search = var_produto?.categoria?.nome ?? '';
										}}>{var_produto?.categoria?.nome}</Button
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
								{#each estoques.filter((e) => {
									if (!search) {
										return true;
									}
									return e.var_produto?.produto?.nome
											.toLowerCase()
											.includes(search) || e.var_produto?.categoria?.nome
											.toLowerCase()
											.includes(search);
								}) as prod, i (prod.id)}
									<CardLancar {prod} />
								{/each}
							</div>
						</div>
					</Dialog.Content>
				</Dialog.Root>
			</div>
			<div>
				<Dialog.Root>
					<Dialog.Trigger class="w-full">
						<ButtonCardapio label={'LANCAR ESTOQUE'} />
					</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Confirmar lancamento</Dialog.Title>
							<Dialog.Description>
								Confirme o lancamento de estoque
							</Dialog.Description>
						</Dialog.Header>
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

<!-- <pre>
		{JSON.stringify($lancarStore, null, 2)}
	</pre> -->
