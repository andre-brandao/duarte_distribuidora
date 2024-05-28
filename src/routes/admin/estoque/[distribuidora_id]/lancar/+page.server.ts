import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const supabase = locals.supabase;

	const [
		{ data: distribuidoras, error: err_cliente },
		{ data: produtos, error: err_produtos },
	] = await Promise.all([
		supabase.from('distribuidora').select('*'),
		supabase
			.from('var_produto')
			.select('id, produto(*), preco(preco_in_cents,tipo), categoria(nome)')
			
	]);

	if (err_cliente) {
		console.log(err_cliente);
		console.error(err_cliente);

		error(404, err_cliente?.message);
	}

	if (err_produtos) {
		console.log(err_produtos);
		console.error(err_produtos);

		error(404, err_produtos.message);
	}

	return { distribuidoras, produtos };
}) satisfies PageServerLoad;
