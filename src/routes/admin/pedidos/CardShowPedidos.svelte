<script lang="ts">
	import type { Json } from '$lib/supabase-types'
	import { formatDate, formatM } from '$lib/utils'
	import type { SupabaseClient } from '@supabase/supabase-js'

	export let supabase: SupabaseClient

	export let pedido: {
		cliente_id: number | null
		created_at: string
		distribuidora_id: number | null
		id: number
		meta_data: Json
		observacao: string | null
		status: string
		tipo: string
		total_in_cents: number
		produto_pedido: {
			quantidade: number
			var_produto: {
				id: number
				produto: {
					created_at: string
					id: number
					nome: string
				} | null
				categoria: {
					nome: string
				} | null
			} | null
			total_in_cents: number
		}[]
	}

	async function removeEstoque(id_pedido: number) {
		const r = await supabase.rpc('process_pedido', { p_pedido_id: id_pedido })

		console.log(r)
	}
</script>

<div class=" mt-2 rounded-lg border bg-gray-100 p-2 shadow-sm">
	<div class="mb-4 grid grid-cols-4 gap-1 text-center text-sm">
		<h3>Pedido <strong>#{pedido.id}</strong></h3>
		<p>Tipo: <strong>{pedido.tipo}</strong></p>
		<p>
			Total: <strong class="text-green-500"
				>R${formatM(pedido.total_in_cents)}</strong
			>
		</p>
		<p>Data: {formatDate(pedido.created_at)}</p>
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
	<div class="mt-2 flex items-center justify-between text-sm">
		<p>Observacoes: {pedido.observacao ?? 'Nenhuma'}</p>
		<button
			on:click={() => removeEstoque(pedido.id)}
			class="rounded-md bg-red-500 p-2 text-white"
		>
			Processar pedido
		</button>
	</div>
</div>
