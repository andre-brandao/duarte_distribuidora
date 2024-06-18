import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { getPedidosNaoFinalizado } from '$lib/db/querys'

export const load = (async ({ locals }) => {
	const supabase = locals.supabase

	const { data: pedidos, error: err_pedidos } =
		await getPedidosNaoFinalizado(supabase)

	if (err_pedidos) {
		error(404, err_pedidos.message)
	}
	return { pedidos }
}) satisfies PageServerLoad
