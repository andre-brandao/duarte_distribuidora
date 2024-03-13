import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

import type { Database } from './supabase-types';
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
