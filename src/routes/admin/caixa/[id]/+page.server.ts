import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const supabase = locals.supabase;

	const [
		{ data: clientes, error: err_cliente },
		{ data: produtos, error: err_produtos },
		{ data: caixas, error: err_caixas },
	] = await Promise.all([
		supabase.from('cliente').select('*'),
		supabase
			.from('var_produto')
			.select('id, produto(*), preco(preco_in_cents,tipo), categoria(nome)'),
		supabase.from('caixa').select('*'),
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

	if (err_caixas) {
		console.log(err_caixas);
		console.error(err_caixas);

		error(404, err_caixas.message);
	}

	return { clientes, produtos, caixas };
}) satisfies PageServerLoad;
