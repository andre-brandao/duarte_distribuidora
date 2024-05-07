import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const supabase = locals.supabase;

	const { data: clientes, error: err_cliente } = await supabase
		.from('cliente')
		.select('*');
	const { data: pedido, error: err_pedido } = await supabase
		.from('pedido')
		.select('*');
	const { data: produto_pedido, error: err_produto_pedido } = await supabase
		.from('produto_pedido')
		.select('*');

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

	if (err_produto_pedido) {
		console.log(err_produto_pedido);
		console.error(err_produto_pedido);
		error(404, err_produto_pedido?.message);
	}

	return { clientes, pedido, produto_pedido };
}) satisfies PageServerLoad;
