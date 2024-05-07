<script lang="ts">
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import ModalPedido from '$lib/components/modal/ModalPedido.svelte';
	export let data: PageData;

	const { produtos } = data;

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

<div class="p-4 sm:ml-64">
	<div class="">
		<div class="flex mb-2 mt-5 justify-between mx-10">
			<div class="items-center gap-0">
				<h1 class="text-center text-4xl font-bold">Cardapio</h1>
			</div>
			<div class="flex justify-center gap-2">
				<Input placeholder="Pesquisar produto..." class="col-span-2 h-auto w-auto py-1" bind:value={search} />
			</div>
		</div>
		<div
			class="grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
		>
			{#each produtosFiltrados as prod (prod.id)}
				{@const varejo =
					prod.preco.find((p) => (p.tipo = 'Varejo'))?.preco_in_cents ?? 0}
				<ModalPedido
					nome={prod.produto?.nome ?? 'Sem nome'}
					preco={varejo ?? 0}
					categoria={prod.categoria?.nome ?? 'Sem categoria'}
					img={'nao tem'}
				/>
			{/each}
		</div>
	</div>
</div>
