import type { Actions, PageServerLoad } from './$types.js';

// TODO CHANGE DB
import { supabase } from '$lib/supabaseClient.js';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const { error: err, data: produtos } = await supabase.from('produtos').select('*');
	// console.log(form);

	const { error: err_cliente, data: clientes } = await supabase.from('cliente').select('*');

	if (err) {
		error(404, err);
	}
	if (err_cliente) {
		error(404, err_cliente);
	}
	return {
		produtos,
		clientes
	};
};
