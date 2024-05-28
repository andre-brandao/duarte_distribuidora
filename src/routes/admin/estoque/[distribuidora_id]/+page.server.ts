import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
export const load = (async ({
	locals: { supabase },
	params: { distribuidora_id },
}) => {
	const { data: estoque, error: err } = await supabase
		.from('estoque')
		.select(
			'*, transacao_estoque(*), var_produto(*, produto(nome), categoria(nome))',
		)
		.eq('distribuidora_id', distribuidora_id);
	if (err) {
		console.error(err);
		error(404, err.message);
	}
	console.log(estoque);

	return { estoque };
}) satisfies PageServerLoad;
