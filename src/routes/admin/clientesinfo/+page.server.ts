import type { PageServerLoad } from './$types'
import type { Actions } from './$types.js'
import { superValidate } from 'sveltekit-superforms'
import { formSchema } from '$lib/schemas/cliente_schema.js'
import { zod } from 'sveltekit-superforms/adapters'
import { error, fail } from '@sveltejs/kit'

interface RouteParams {
	id: string
}

export const load: PageServerLoad = async ({
	params,
	locals: { supabase },
}) => {
	const { id } = params as RouteParams

	if (!id) {
		const { data: clientes, error: err_cliente } = await supabase
			.from('cliente')
			.select('*')

		if (err_cliente) {
			console.error(err_cliente)
			throw error(404, err_cliente.message)
		}

		return { clientes }
	}
}
