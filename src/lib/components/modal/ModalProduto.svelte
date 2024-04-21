<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import CardProduto from '$lib/components/breninteste/card/CardProduto.svelte';

	let produtos: {
		nome: string;
		id: number;
		preco: number;
		categoria: string;
		img: string;
	}[] = [
		{
			nome: 'Heineken',
			id: 0,
			preco: 20,
			categoria: 'Cerveja',
			img: 'https://source.unsplash.com/HMimP8Jm_iI'
		},
		{
			nome: 'Stella',
			id: 1,
			preco: 30,
			categoria: 'Cerveja',
			img: 'https://source.unsplash.com/UErWoQEoMrc'
		},
		{
			nome: 'Budweiser',
			id: 2,
			preco: 25,
			categoria: 'Vinho',
			img: 'https://source.unsplash.com/Qy2KMPRV3X4'
		},
		{
			nome: 'Corona',
			id: 3,
			preco: 22,
			categoria: 'Cerveja',
			img: 'https://source.unsplash.com/1UDj1sTzmzQ'
		},
		{
			nome: 'Guinness',
			id: 4,
			preco: 28,
			categoria: 'Cerveja',
			img: 'https://source.unsplash.com/vCHHUpiU9sY'
		}
	];
	let categoriasUnicas = Array.from(new Set(produtos.map((produto) => produto.categoria)));
	let searchTerm = '';

	$: filteredProdutos = produtos.filter((produto) => {
		const nomeMatch = produto.nome.toLowerCase().includes(searchTerm.toLowerCase());
		const categoriaMatch = produto.categoria.toLowerCase().includes(searchTerm.toLowerCase());
		return nomeMatch || categoriaMatch;
	});

	function setFilter(categoria: string) {
		searchTerm = categoria;
	}
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'brenosubmit' })}
		>ACESSAR PRODUTOS</Dialog.Trigger
	>
	<Dialog.Content class="flex h-[600px] overflow-hidden sm:max-w-[900px]">
		<div class="sticky top-0 flex h-full w-1/4 flex-col gap-2 bg-gray-100 p-4 text-center">
			<Dialog.Title class="pb-2 text-center text-2xl">Categorias:</Dialog.Title>
			<div class="flex flex-col gap-2">
				{#each categoriasUnicas as categoria}
					<Button on:click={() => setFilter(categoria)}>{categoria}</Button>
				{/each}
			</div>
		</div>
		<div class="w-3/4 overflow-y-auto">
			<Dialog.Header class="sticky top-0 bg-white">
				<div class="gap-0 pb-5">
					<div class=" flex items-center justify-between gap-0 pr-5">
						<Dialog.Title class="pr-3 text-center text-3xl">Produtos:</Dialog.Title>
						<Input
							id="name"
							placeholder="Pesquisar produto..."
							class="col-span-1 h-auto w-auto py-1"
							bind:value={searchTerm}
						/>
					</div>
				</div>
			</Dialog.Header>
			<div class="grid pr-5">
				{#each filteredProdutos as produto (produto.id)}
					<CardProduto
						nome={produto.nome}
						preco={produto.preco}
						categoria={produto.categoria}
						img={produto.img}
					/>
				{/each}
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
