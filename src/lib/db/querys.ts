import type { Database } from '$lib/supabase-types'
import { type SupabaseClient } from '@supabase/supabase-js'
import { error } from '@sveltejs/kit'

type DB = SupabaseClient<Database>

export function getCaixa(
	supabase: DB,
	args: {
		caixa_id: number
	},
) {
	const caixa_id = args.caixa_id

	return supabase.from('caixa').select('*').eq('id', caixa_id).single()
}

export function updateStatusPedido(
	supabase: DB,
	args: {
		id: number
		status: string
	},
) {
	return supabase
		.from('pedido')
		.update({ status: args.status })
		.eq('id', args.id)
}

export function getPedidosNaoFinalizado(supabase: DB, args?: {}) {
	return supabase
		.from('pedido')
		.select('*, produto_pedido(*,var_produto(id, produto(*), categoria(nome)))')
}
