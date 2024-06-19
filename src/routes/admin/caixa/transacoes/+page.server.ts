import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load = (async ({ locals }) => {
	const supabase = locals.supabase

	const [{ data: transacao_caixa, error: err_transacao_caixa }] =
		await Promise.all([
			supabase
				.from('transacao_caixa')
				.select('*,caixa(*,distribuidora(id,nome))').order('created_at',{
					ascending: true
				}),
		])

	if (err_transacao_caixa) {
		console.log(err_transacao_caixa)
		console.error(err_transacao_caixa)

		error(404, err_transacao_caixa.message)
	}

	return { transacao_caixa }
}) satisfies PageServerLoad
