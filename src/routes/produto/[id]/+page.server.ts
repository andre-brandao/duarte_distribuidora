import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const supabsae = locals.supabase;
	const produtoId = params.id;

	const [
		{ data: produto, error: err_prod },
		{ data: categorias, error: err_cat },
	] = await Promise.all([
		supabsae
			.from('produto')
			.select('*, var_produto(id,categoria(id,nome),preco(*))')
			.eq('id', produtoId)
			.single(),
		supabsae.from('categoria').select('*'),
	]);

	if (err_prod) {
		error(404, err_prod.message);
	}
	if (err_cat) {
		error(404, err_cat.message);
	}

	return { produto, categorias };
}) satisfies PageServerLoad;
