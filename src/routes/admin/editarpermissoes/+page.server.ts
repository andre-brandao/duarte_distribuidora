import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const supabase = locals.supabase;

	const { data, error: err } = await supabase.from(`info_user`).select(`*,permissoes(*)`);
	if (err) {
		error(404, err.message);
	}
	return { infouser: data };
}) satisfies PageServerLoad;