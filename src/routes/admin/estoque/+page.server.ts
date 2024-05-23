import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
export const load = (async ({ locals: { supabase } }) => {
	const { data: estoque, error: err } = await supabase
		.from('estoque')
		.select('*, var_produto(*, produto(*), categoria(*))');
	if (err) {
		console.error(err);
		error(404, err.message);
	}
	console.log(estoque);

	return { estoque };
}) satisfies PageServerLoad;
