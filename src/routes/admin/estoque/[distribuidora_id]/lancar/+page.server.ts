import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const supabase = locals.supabase;

	const distribuidora_id = params.distribuidora_id;

	const [
		{ data: distribuidoras, error: err_cliente },
		{ data: estoques, error: err_estoques },
	] = await Promise.all([
		supabase.from('distribuidora').select('*'),
		supabase
			.from('estoque')
			.select(
				'*, var_produto(id, produto(*), categoria(nome))',
			)
			.eq('distribuidora_id', distribuidora_id),
	]);

	if (err_cliente) {
		console.log(err_cliente);
		console.error(err_cliente);

		error(404, err_cliente?.message);
	}

	if (err_estoques) {
		console.log(err_estoques);
		console.error(err_estoques);

		error(404, err_estoques.message);
	}

	return { distribuidoras, estoques };
}) satisfies PageServerLoad;
