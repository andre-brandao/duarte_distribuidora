import type { Database } from '$lib/supabase-types';
import { type SupabaseClient } from '@supabase/supabase-js';
import { error } from '@sveltejs/kit';

type DB = SupabaseClient<Database>;

export function getCaixa(
	supabase: DB,
	args: {
		caixa_id: number;
	},
) {
	const caixa_id = args.caixa_id;

	return supabase.from('caixa').select('*').eq('id', caixa_id).single();
}