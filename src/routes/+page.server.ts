import type { Actions, PageServerLoad } from './$types.js';

// TODO CHANGE DB
import { supabase } from '$lib/supabaseClient.js';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {};
};
