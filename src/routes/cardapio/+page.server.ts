import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const supabase = locals.supabase;

	const { data: categorias, error: err_produtos } = await supabase
		.from('categoria')
		.select('id,nome, var_produto(*, produto(*), preco(*))');
		
	// const { data: produtos, error: err_produtos } = await supabase
	// .from('categoria').select('*,var_produto(id, produto(*), preco(preco_in_cents,tipo))')

	if (err_produtos) {
		console.log(err_produtos);
		console.error(err_produtos);

		error(404, err_produtos.message);
	}

	return {  categorias };
}) satisfies PageServerLoad;
