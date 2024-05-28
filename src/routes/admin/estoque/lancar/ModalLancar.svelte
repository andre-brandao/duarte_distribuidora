<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import ButtonCardapio from '$lib/components/buttons/ButtonCardapio.svelte';
	import { ShoppingBasket } from 'lucide-svelte';
	import CardLancar from './CardLancar.svelte';

	export let produtos: {
		id: number;
		produto: {
			created_at: string;
			id: number;
			nome: string;
		} | null;
		preco: {
			preco_in_cents: number;
			tipo: string;
		}[];
		categoria: {
			nome: string;
		} | null;
	}[];

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

<Dialog.Root>
	<Dialog.Trigger class="w-full">
		<ButtonCardapio label={'ACESSAR PRODUTOS'} Icon={ShoppingBasket} />
	</Dialog.Trigger>
	<Dialog.Content class="flex h-[600px] overflow-hidden sm:max-w-[900px]">
		<div
			class="sticky top-0 flex h-full w-1/4 flex-col gap-2 bg-gray-100 p-4 text-center"
		>
			<Dialog.Title class="pb-2 text-center text-2xl">Categorias:</Dialog.Title>
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
						prod.preco.find((p) => (p.tipo = 'Varejo'))?.preco_in_cents ?? 0}
					<CardLancar produto={prod} />
				{/each}
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
