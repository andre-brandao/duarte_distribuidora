<script lang="ts">
	import { formatDate } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	let { supabase } = data;
	$: ({ supabase } = data);

	const pedidos = data.pedidos;

	async function removeEstoque(id_pedido: number) {
		const r = await supabase.rpc('process_pedido', { p_pedido_id: id_pedido });

		console.log(r);
	}
</script>

<!-- <pre>
	{JSON.stringify(pedidos, null, 2)}
</pre> -->
<div>
	<h1 class="text-3xl">Pedidos:</h1>
	{#each pedidos as ped}
		<div class=" mt-4 rounded-lg border bg-gray-100 p-6 shadow-sm">
			<div class="mb-4 flex gap-2 text-center text-lg">
				<h3>Pedido <strong>#{ped.id}</strong> -</h3>
				<p>
					Total: <strong class="text-green-500">R${ped.total_in_cents}</strong> -
				</p>
				<p>Tipo do pedido: <strong>{ped.tipo}</strong> -</p>
				<p>Data: {formatDate(ped.created_at)} -</p>
				<p>Observacoes: {ped.observacao}</p>

				<button
					on:click={() => removeEstoque(ped.id)}
					class="rounded-md bg-red-500 px-4 py-2 text-white"
				>
					Processar pedido
				</button>
			</div>
			<div>
				<h4 class="mb-2 text-lg font-semibold">Produtos pedidos:</h4>
				<div
					class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
				>
					{#each ped.produto_pedido as produto}
						<div class="flex rounded-md bg-white p-2 shadow-sm">
							<p class="text-gray-800">
								{produto.quantidade}x -
								{produto.var_produto?.produto?.nome}
								{produto.var_produto?.categoria?.nome} -
								<span class="font-bold">
									R${produto.total_in_cents}
								</span>
							</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/each}
</div>
