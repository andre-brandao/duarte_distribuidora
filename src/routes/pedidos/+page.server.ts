import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const supabase = locals.supabase;

	const { data: pedidos, error: err_pedidos } = await supabase
		.from('pedido')
		.select('*, produto_pedido(*)');

	if (err_pedidos) {
		error(404, err_pedidos.message);
	}
	return { pedidos };
}) satisfies PageServerLoad;
