<script lang="ts">
	import { formatDate, formatM } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	let { supabase } = data;
	$: ({ supabase } = data);

	const pedidos = data.pedidos;

	async function removeEstoque(id_pedido: number) {
		const r = await supabase.rpc('process_pedido', { p_pedido_id: id_pedido });

		console.log(r);
	}

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
	<h1 class="text-3xl font-bold">Pedidos:</h1>
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
	{#if pedidoSelecionado != 'all'}
		{#each pedidosFiltrados as pedido}
			<div class=" mt-2 rounded-lg border bg-gray-100 p-3 shadow-sm">
				<div class="mb-4 grid grid-cols-3 gap-2 text-center text-sm">
					<h3>Pedido <strong>#{pedido.id}</strong></h3>
					<p>Tipo: <strong>{pedido.tipo}</strong></p>
					<p>
						Total: <strong class="text-green-500"
							>R${formatM(pedido.total_in_cents)}</strong
						>
					</p>
					<p>Data: {formatDate(pedido.created_at)}</p>
					<p>Observacoes: {pedido.observacao ?? 'Nenhuma observacao'}</p>

					<button
						on:click={() => removeEstoque(pedido.id)}
						class="rounded-md bg-red-500 px-4 py-2 text-white"
					>
						Processar pedido
					</button>
					<p>{pedido.status}</p>
				</div>
				<div>
					<h4 class="mb-2 text-lg font-semibold">Produtos pedidos:</h4>
					<div class="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
						{#each pedido.produto_pedido as produto}
							<div class="flex rounded-md bg-white p-2 shadow-sm">
								<p class="text-gray-800">
									{produto.quantidade}x -
									{produto.var_produto?.produto?.nome}
									{produto.var_produto?.categoria?.nome} -
									<span class="font-bold">
										R${formatM(produto.total_in_cents)}
									</span>
								</p>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	{:else}
		<div class="grid grid-cols-1 gap-2 xl:grid-cols-3">
			<div>
				<h1 class="text-center">Pendentes:</h1>
				{#each pedidos as pedido}
					<div class=" mt-2 rounded-lg border bg-gray-100 p-3 shadow-sm">
						<div class="mb-4 grid grid-cols-3 gap-2 text-center text-sm">
							<h3>Pedido <strong>#{pedido.id}</strong></h3>
							<p>Tipo: <strong>{pedido.tipo}</strong></p>
							<p>
								Total: <strong class="text-green-500"
									>R${formatM(pedido.total_in_cents)}</strong
								>
							</p>
							<p>Data: {formatDate(pedido.created_at)}</p>
							<p>Observacoes: {pedido.observacao ?? 'Nenhuma observacao'}</p>

							<button
								on:click={() => removeEstoque(pedido.id)}
								class="rounded-md bg-red-500 px-4 py-2 text-white"
							>
								Processar pedido
							</button>
							<p>{pedido.status}</p>
						</div>
						<div>
							<h4 class="mb-2 text-lg font-semibold">Produtos pedidos:</h4>
							<div class="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
								{#each pedido.produto_pedido as produto}
									<div class="flex rounded-md bg-white p-2 shadow-sm">
										<p class="text-gray-800">
											{produto.quantidade}x -
											{produto.var_produto?.produto?.nome}
											{produto.var_produto?.categoria?.nome} -
											<span class="font-bold">
												R${formatM(produto.total_in_cents)}
											</span>
										</p>
									</div>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
			<div><h1 class="text-center">A caminho:</h1></div>
			<div><h1 class="text-center">Entregue:</h1></div>
		</div>
	{/if}
</div>
