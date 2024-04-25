<script lang="ts">
	import ModalCard from './../../lib/components/modal/ModalCard.svelte';
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	export let data: PageData;

	const { produtos } = data;
</script>

<div class="p-4 sm:ml-64">
	<div
		class="rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700"
	>
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
			/>
			<!-- {#each $categoriasUnicas as categoria}
				<Button on:click={() => setFilter(categoria)}>{categoria}</Button>
			{/each} -->
		</div>
		<div
			class="grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
		>
			{#each produtos as prod (prod.id)}
				{@const varejo =
					prod.preco.find((p) => (p.tipo = 'Varejo'))?.preco_in_cents ?? 0}
				<ModalCard
					nome={prod.produto?.nome ?? 'Sem nome'}
					preco={varejo ?? 0}
					categoria={prod.categoria?.nome ?? 'Sem categoria'}
					img={'nao tem'}
				/>

				<!-- {@const varejo =
					prod.preco.find((p) => (p.tipo = 'Varejo'))?.preco_in_cents ?? 0}
				<ModalCard
					nome={`${prod.produto?.nome} ${prod.categoria?.nome}`}
					preco_in_cents={varejo}
				/> -->
			{/each}
		</div>
	</div>
</div>
