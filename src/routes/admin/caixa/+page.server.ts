import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const supabase = locals.supabase;

	const [{ data: distribuidoras, error: err_distribuidoras }] =
		await Promise.all([
			supabase.from('distribuidora').select('id,nome,caixa(*)'),
		]);

	if (err_distribuidoras) {
		console.log(err_distribuidoras);
		console.error(err_distribuidoras);

		error(404, err_distribuidoras.message);
	}

	return { distribuidoras: distribuidoras };
}) satisfies PageServerLoad;
