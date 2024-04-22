<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import CardProduto from '$lib/components/breninteste/card/CardProduto.svelte';
	import { searchTerm, categoriasUnicas, filteredProdutos } from '$lib/stores/filtroProdutosStore';

	function setFilter(categoria: string) {
		$searchTerm = categoria;
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
				{#each $categoriasUnicas as categoria}
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
							bind:value={$searchTerm}
						/>
					</div>
				</div>
			</Dialog.Header>
			<div class="grid pr-5">
				{#each $filteredProdutos as produto (produto.id)}
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
