import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const supabase = locals.supabase;
	const cliente_id = params.id;

	const [
		{ data: clientes, error: err_cliente },
		{ data: pedido, error: err_pedido },
	] = await Promise.all([
		supabase.from('cliente').select('*').eq('id', cliente_id).single(),
		supabase
			.from('pedido')
			.select('* , produto_pedido(*, var_produto(*, produto(nome), categoria(nome)))')
			.eq('cliente_id', cliente_id),
	]);
	console.log(pedido);
	
	if (err_cliente) {
		console.log(err_cliente);
		console.error(err_cliente);

		error(404, err_cliente?.message);
	}
	if (err_pedido) {
		console.log(err_pedido);
		console.error(err_pedido);
		error(404, err_pedido?.message);
	}

	return { clientes, pedido };
}) satisfies PageServerLoad;
