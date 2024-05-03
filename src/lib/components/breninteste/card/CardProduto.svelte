<script lang="ts">
	import DropDownProduto from './../DropDownProduto.svelte';
	import { Plus } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();

	export let produto: {
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
	};

	const varejo =
		produto.preco.find((p) => (p.tipo = 'Varejo'))?.preco_in_cents ?? 0;
	//export let img: string;
</script>

<hr />
<div class="flex py-3">
	<div class="w-full flex-none md:w-auto">
		<!-- <img
			alt="imagem {nome}"
			src={img}
			class="h-16 w-16 rounded-lg object-cover md:h-20 md:w-20"
		/> -->
	</div>
	<div class="flex-grow pl-4">
		<div>
			<h2 class="text-xl font-bold">{produto.produto?.nome}</h2>
			<h3 class="text-md text-gray-600">{produto.categoria?.nome}</h3>
			<DropDownProduto />
		</div>
	</div>
	<div class="w-full text-right">
		<span class="block pb-3 text-xl font-bold">R${varejo}</span>
		<Button
			class="flex-none"
			on:click={() => dispatch('add_produtos', produto)}
		>
			<p class="pr-2">Adicionar produto</p>
			<Plus />
		</Button>
	</div>
</div>
