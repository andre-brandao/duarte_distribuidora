<script lang="ts">
	import { formatDate, formatM } from '$lib/utils'
	import type { PageData } from './$types'
	import CardShowPedidos from './CardShowPedidos.svelte'
	import { updateStatusPedido } from '$lib/db/querys'
	import { onMount, onDestroy } from 'svelte'
	import { getPedidosNaoFinalizado } from '$lib/db/querys'

	export let data: PageData

	let { supabase } = data
	$: ({ supabase } = data)

	const pedidos = data.pedidos

	let pedidoSelecionado = 'all'

	let pedidosFiltrados = pedidos

	const pedidosPorStatus = () => {
		if (pedidoSelecionado === 'all') {
			return pedidos
		}

		if (pedidoSelecionado === 'varejo' || pedidoSelecionado === 'atacado') {
			const filteredPedidos = pedidos.filter(
				(pedido) => pedido.meta_data?.tipo_pessoa === pedidoSelecionado,
			)
			return filteredPedidos
		}

		return pedidos.filter((pedido) => pedido.status === pedidoSelecionado)
	}
	
	$: if (pedidoSelecionado) {
		pedidosFiltrados = pedidosPorStatus()
	}

	onMount(() => {
		const sub_channel = supabase
			.channel('custom-filter-channel')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'pedido',
					filter: 'status=neq.finalizado',
				},
				async (payload) => {
					await getPedidosNaoFinalizado(supabase)
				},
			)
			.subscribe()

		return sub_channel.unsubscribe()
	})
</script>

<!-- <pre>
	{JSON.stringify(pedidos, null, 2)}
</pre> -->
<div>
	<div class="mb-4 flex items-center justify-between">
		{#if pedidoSelecionado === 'all'}
			<h1 class="text-3xl font-bold">Pedidos:</h1>
		{:else}
			<h1 class="text-3xl font-bold">Pedidos {pedidoSelecionado}:</h1>
		{/if}
		<div class="mt-2">
			<label for="filtro">Filtrar pedidos:</label>
			<select
				name="filtro"
				id="filtro"
				class="rounded-lg border bg-white p-2"
				bind:value={pedidoSelecionado}
			>
				<option value="all">Todos pedidos</option>
				<option value="varejo">Varejo</option>
				<option value="atacado">Atacado</option>
				<hr />
				<option value="aberto">Pendentes</option>
				<option value="a_caminho">A caminho</option>
				<option value="entregue">Entregue</option>
			</select>
		</div>
	</div>
	{#if pedidoSelecionado != 'all' && pedidoSelecionado != 'varejo' && pedidoSelecionado != 'atacado'}
		{#each pedidosFiltrados as pedido}
			<CardShowPedidos {pedido} {supabase} />
		{/each}
	{:else if pedidoSelecionado === 'all' || pedidoSelecionado === 'varejo' || pedidoSelecionado === 'atacado'}
		<div class="grid grid-cols-1 gap-2 xl:grid-cols-3">
			<div class="max-h-[88vh] overflow-y-auto rounded-lg bg-red-100 p-2">
				<h1 class="text-center">Pendentes:</h1>
				{#each pedidosFiltrados as pedido}
					{#if pedido.status === 'aberto'}
						<CardShowPedidos
							{pedido}
							{supabase}
							button_text="Saiu Pra Entrega"
							click_button={async () => {
								console.log('click aberto')
								pedido.status = 'a_caminho'
								const { error } = await updateStatusPedido(supabase, {
									id: pedido.id,
									status: 'a_caminho',
								})
								if (error) {
									pedido.status = 'aberto'
								}
							}}
						/>
					{/if}
				{/each}
			</div>
			<div class="max-h-[88vh] overflow-y-auto rounded-lg bg-yellow-100 p-2">
				<h1 class="text-center">A caminho:</h1>
				{#each pedidosFiltrados as pedido}
					{#if pedido.status === 'a_caminho'}
						<CardShowPedidos
							{pedido}
							{supabase}
							button_text="Chegou"
							click_button={async () => {
								console.log('click caminho')
								pedido.status = 'entregue'
								const { error } = await updateStatusPedido(supabase, {
									id: pedido.id,
									status: 'entregue',
								})
								if (error) {
									pedido.status = 'aberto'
								}
							}}
						/>
					{/if}
				{/each}
			</div>
			<div class="max-h-[88vh] overflow-y-auto rounded-lg bg-green-100 p-2">
				<h1 class="text-center">Entregue:</h1>
				{#each pedidosFiltrados as pedido}
					{#if pedido.status === 'entregue'}
						<CardShowPedidos
							{pedido}
							{supabase}
							button_text="Confirmar Entrega"
							click_button={async () => {
								console.log('click entregue')
								pedido.status = 'finalizado'
								const { error } = await updateStatusPedido(supabase, {
									id: pedido.id,
									status: 'finalizado',
								})
								if (error) {
									pedido.status = 'entregue'
								}
							}}
						/>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</div>
