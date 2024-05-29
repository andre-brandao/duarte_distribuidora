<script lang="ts">
	import { Plus, Minus } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { pedidoStore } from '$lib/stores/pedidoStore';
	import { derived } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';
	import { formatM, mask } from '$lib/utils';
	import Label from '$lib/components/ui/label/label.svelte';

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

	let quantidade = derived(
		pedidoStore,
		() =>
			$pedidoStore.find((p) => p.var_produto_id === produto?.id)?.quantidade ??
			0,
	);

	function increase() {
		if (!selectedPrice) {
			return;
		}
		pedidoStore.addItemPedido({
			var_produto_id: produto.id,
			unidade_em_cents: selectedPrice,
			nome: `${produto.produto?.nome}  ${produto.categoria?.nome}`,
		});
	}

	function decrease() {
		pedidoStore.removeUmItemPedido(produto.id);
	}

	let selectedPrice: number;
</script>

<hr />
<div class="flex py-3">
	<div class="w-full flex-none md:w-auto">
		<img
			alt="imagem"
			src={'/202403131209_krxb_i.jpg'}
			class="h-16 w-16 rounded-lg object-cover md:h-20 md:w-20"
		/>
	</div>
	<div class="flex-grow pl-4">
		<div>
			<h2 class="text-xl font-bold">{produto.produto?.nome}</h2>
			<h3 class="text-md text-gray-600">{produto.categoria?.nome}</h3>
		</div>
	</div>
	<div class="w-full object-right text-right">
		<span class="block gap-4 pb-3 text-xl font-bold">
			<!-- <div class="flex items-center gap-3 float-right mb-2">
				<Label for="custo">Preco de custo:</Label>
				<input
					class=" flex h-9 w-24 rounded-md border border-gray-300 bg-transparent bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					type="number"
					use:mask={{
						mask: 'money',
					}}
				/>
			</div> -->

			<div class="float-right flex items-center justify-end gap-3 text-center">
				{#if $quantidade > 0}
					<Button on:click={decrease}><Minus /></Button>
				{/if}
				<input
					min="1"
					class="min-w-10 max-w-28 bg-white text-right text-xl font-bold focus:border-yellow-500"
					bind:value={$quantidade}
				/>
				<Button on:click={increase}><Plus /></Button>
			</div>
		</span>
	</div>
</div>
