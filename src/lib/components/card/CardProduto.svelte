<script lang="ts">
	import { Plus, Minus } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { pedidoStore } from '$lib/stores/pedidoStore';
	import { derived } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';
	import { formatM } from '$lib/utils';

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

	$: storeProdutoIndex = $pedidoStore.findIndex(
		(p) => p.var_produto_id === produto?.id,
	);

	$: quantidade =
		$pedidoStore.find((p) => p.var_produto_id === produto?.id)?.quantidade ?? 0;

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
			<select
				bind:value={selectedPrice}
				disabled={quantidade > 1}
				name="preco"
				id="precos"
				class="mt-2 bg-transparent"
			>
				{#each produto.preco as preco}
					<option value={preco.preco_in_cents}>{preco.tipo}</option>
				{/each}
			</select>
		</div>
	</div>
	<div class="w-full text-right">
		<span class="block pb-3 text-xl font-bold">R${formatM(selectedPrice)}</span>
		<div class="flex items-center justify-end gap-3 text-center">
			{#if quantidade && quantidade > 0}
				<Button on:click={decrease}><Minus /></Button>
			{/if}
			<input
				min="1"
				class="min-w-10 max-w-28 bg-white text-right text-xl font-bold focus:border-yellow-500"
				value={quantidade}
				on:change={(e) => {

					console.log(e);

					const quant_temp = e.target?.value

					pedidoStore.setQuantidadePedido({
						var_produto_id: produto.id,
						unidade_em_cents: selectedPrice,
						nome: `${produto.produto?.nome}  ${produto.categoria?.nome}`,
						quantidade: quant_temp,
					});
				}}
			/>
			<Button on:click={increase}><Plus /></Button>
		</div>
	</div>
</div>
