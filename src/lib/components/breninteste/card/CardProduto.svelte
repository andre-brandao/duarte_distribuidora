<script lang="ts">
	import { Plus, Minus } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let quantidade = 1;

	function increase() {
		quantidade += 1;
	}

	function decrease() {
		if (quantidade > 1) {
			quantidade -= 1;
		}
	}

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
	let selectedPrice: { preco_in_cents: number; tipo: string } | null = null;
	let selectedPriceInCents: string | number = '';

	$: {
		selectedPrice =
			produto.preco.find((p) => p.preco_in_cents === selectedPriceInCents) ??
			null;
	}
</script>

<hr />
<div class="flex py-3">
	<div class="w-full flex-none md:w-auto">
		<img
			alt="imagem"
			src={'t'}
			class="h-16 w-16 rounded-lg object-cover md:h-20 md:w-20"
		/>
	</div>
	<div class="flex-grow pl-4">
		<div>
			<h2 class="text-xl font-bold">{produto.produto?.nome}</h2>
			<h3 class="text-md text-gray-600">{produto.categoria?.nome}</h3>
			<select
				bind:value={selectedPriceInCents}
				name="preco"
				id="precos"
				class="mt-2 bg-transparent"
			>
				<option value="">Selecione...</option>
				{#each produto.preco as preco}
					<option value={preco.preco_in_cents}>{preco.tipo}</option>
				{/each}
			</select>
		</div>
	</div>
	<div class="w-full text-right">
		<span class="block pb-3 text-xl font-bold"
			>R${selectedPrice ? selectedPrice.preco_in_cents : '0.00'}</span
		>
		<div class="flex items-center justify-end gap-3 text-center">
			<Button on:click={decrease}><Minus /></Button>
			<input
				min="1"
				style="width: {String(quantidade).length * 0.75}rem;"
				class="text-xl font-bold"
				value={quantidade}
			/>
			<Button on:click={increase}><Plus /></Button>
			<Button
				class="flex-none"
				on:click={() => dispatch('add_produtos', produto)}
			>
				<p class="pr-2">Adicionar produto</p>
				<Plus />
			</Button>
		</div>
	</div>
</div>
