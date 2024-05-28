import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const supabase = locals.supabase;

	const { data, error: err } = await supabase.from(`distribuidora`).select(`*`);
	if (err) {
		error(404, err.message);
	}
	return { distribuidoras: data };
}) satisfies PageServerLoad;
