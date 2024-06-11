<script lang="ts">
	import { formatDate, formatM } from '$lib/utils';
	import type { PageData } from './$types';
	import CardShowPedidos from './CardShowPedidos.svelte';

	export let data: PageData;

	let { supabase } = data;
	$: ({ supabase } = data);

	const pedidos = data.pedidos;

	let pedidoSelecionado = 'all';

	let pedidosFiltrados = pedidos;

	$: if (pedidoSelecionado) pedidosPorStatus();

	const pedidosPorStatus = () => {
		if (pedidoSelecionado === 'all') {
			return pedidos;
		}
		console.log(pedidosFiltrados);
		return (pedidosFiltrados = pedidos.filter(
			(pedido) => pedido.status === pedidoSelecionado,
		));
	};
</script>

<!-- <pre>
	{JSON.stringify(pedidos, null, 2)}
</pre> -->
<div>
	<div class="flex justify-between mb-4 items-center">
		<h1 class="text-3xl font-bold">Pedidos:</h1>
		<div class="mt-2">
			<label for="filtro">Filtrar pedidos:</label>
			<select
				name="filtro"
				id="filtro"
				class="rounded-lg border bg-white p-2"
				bind:value={pedidoSelecionado}
			>
				<option value="all">Todos pedidos</option>
				<option value="aberto">Pendentes</option>
				<option value="caminho">A caminho</option>
				<option value="entregue">Entregue</option>
			</select>
		</div>
	</div>
	{#if pedidoSelecionado != 'all'}
		{#each pedidosFiltrados as pedido}
			<CardShowPedidos {pedido} {supabase} />
		{/each}
	{:else}
		<div class="grid grid-cols-1 gap-2 xl:grid-cols-3">
			<div>
				<h1 class="text-center">Pendentes:</h1>
				{#each pedidos as pedido}
					{#if pedido.status === 'aberto'}
						<CardShowPedidos {pedido} {supabase} />
					{/if}
				{/each}
			</div>
			<div>
				<h1 class="text-center">A caminho:</h1>
				{#each pedidos as pedido}
					{#if pedido.status === 'caminho'}
						<CardShowPedidos {pedido} {supabase} />
					{/if}
				{/each}
			</div>
			<div>
				<h1 class="text-center">Entregue:</h1>
				{#each pedidos as pedido}
					{#if pedido.status === 'entregue'}
						<CardShowPedidos {pedido} {supabase} />
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</div>
