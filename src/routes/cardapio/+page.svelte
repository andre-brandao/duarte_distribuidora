<script lang="ts">
	import CardProdutoV2 from '$lib/components/breninteste/card/CardProdutoV2.svelte';
	import type { PageData } from './$types';
	import { produtos } from '$lib/stores/produtosStore';
	import { Input } from '$lib/components/ui/input/index.js';
	import { searchTerm, categoriasUnicas, filteredProdutos } from '$lib/stores/filtroProdutosStore';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';

	// export let data: PageData;

	function setFilter(categoria: string) {
		$searchTerm = categoria;
	}
</script>

<div class="p-4 sm:ml-64">
	<div class="rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
		<div class="gap-0 py-1">
			<div class="items-center gap-0 pb-7">
				<h1 class="text-center text-4xl font-bold">Cardapio</h1>
			</div>
		</div>
		<div class="flex justify-center gap-2">
			<Input
				id="name"
				placeholder="Pesquisar produto..."
				class="col-span-1 h-auto w-auto py-1"
				bind:value={$searchTerm}
			/>
			{#each $categoriasUnicas as categoria}
				<Button on:click={() => setFilter(categoria)}>{categoria}</Button>
			{/each}
		</div>
		<div
			class="grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
		>
			{#each $filteredProdutos as produto (produto.id)}
				<CardProdutoV2
					nome={produto.nome}
					preco={produto.preco}
					categoria={produto.categoria}
					img={produto.img}
				/>
			{/each}
		</div>
	</div>
</div>
