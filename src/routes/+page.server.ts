import type { Actions, PageServerLoad } from './$types.js';

// TODO CHANGE DB
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {};
};
