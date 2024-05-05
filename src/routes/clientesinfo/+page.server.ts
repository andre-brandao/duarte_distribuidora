import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const supabase = locals.supabase;

	const { data: clientes, error: err_cliente } = await supabase.from('cliente').select('*');

	if (err_cliente) {
		console.log(err_cliente);
		console.error(err_cliente);

		error(404, err_cliente?.message);
	}

	return { clientes };
}) satisfies PageServerLoad;
