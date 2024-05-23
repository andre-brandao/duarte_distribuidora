import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const supabase = locals.supabase;

	const { data: produtos, error: err } = await supabase
		.from('produto')
		.select('*');
	if (err) {
		error(404, err.message);
	}
	return { produtos };
}) satisfies PageServerLoad;
