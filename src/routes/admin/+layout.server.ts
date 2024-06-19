import { error, redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load = (async ({ locals }) => {
	const supabase = locals.supabase

	const { user, session } = await locals.safeGetSession()
	if (!user) {
		return
	}

	const { data: permissoes, error: err } = await supabase
		.from('permissoes')
		.select('nome')
		.eq('user_id', user?.id)

	if (user?.user_metadata.tipo !== 'admin') {
		error(403, 'Pagina para administradores, acesso negado')
	}
	return { permissoes }
}) satisfies LayoutServerLoad
