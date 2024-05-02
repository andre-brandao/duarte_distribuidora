import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const supabase = locals.supabase;

	const estoqueID = params.id_var_produto;

	const { data: estoque, error: err_estoque } = await supabase
		.from('var_produto')
		.select(
			'*, estoque(quantidade, transacao_estoque(*)), categoria(nome), produto(nome)',
		)
		.eq('id', estoqueID)
		.single();

	if (err_estoque) {
		error(404, err_estoque.message);
	}
	return { estoque };
}) satisfies PageServerLoad;
