import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const supabase = locals.supabase;
	const caixa_id = params.id;

	const [
		{ data: clientes, error: err_cliente },
		{ data: produtos, error: err_produtos },
		{ data: caixa, error: err_caixa },
	] = await Promise.all([
		supabase.from('cliente').select('*'),
		supabase
			.from('var_produto')
			.select('id, produto(*), preco(preco_in_cents,tipo), categoria(nome)'),
		supabase.from('caixa').select('*').eq('id', caixa_id).single(),
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

	if (err_caixa) {
		console.log(err_caixa);
		console.error(err_caixa);

		error(404, err_caixa.message);
	}

	return { clientes, produtos, caixa };
}) satisfies PageServerLoad;
