import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';
export const load = (async () => {
	const { data: estoque, error: err } = await supabase.from('estoque').select('*');
	if (err) {
		console.error(err);
		error(404, err.message);
	}
	console.log(estoque);

	return { estoque };
}) satisfies PageServerLoad;
