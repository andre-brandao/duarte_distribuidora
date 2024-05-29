import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const supabase = locals.supabase;

	const estoqueID = Number(params.estoque_id);

	const { data: estoque, error: err_estoque } = await supabase
		.from('estoque')
		.select(
		"*, transacao_estoque(*), var_produto(*, produto(nome), categoria(nome))"
		)
		.eq('id', estoqueID)
		.single();

	if (err_estoque) {
		error(404, err_estoque.message);
	}
	return { estoque, estoqueID };
}) satisfies PageServerLoad;
