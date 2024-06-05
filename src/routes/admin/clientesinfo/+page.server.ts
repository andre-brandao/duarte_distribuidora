import type { PageServerLoad } from './$types';
import type { Actions } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '$lib/schemas/cliente_schema.js';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail } from '@sveltejs/kit';

interface RouteParams {
	id: string;
}

export const load: PageServerLoad = async ({
	params,
	locals: { supabase },
}) => {
	const { id } = params as RouteParams;

	let form = await superValidate(zod(formSchema));

	if (!id) {
		const { data: clientes, error: err_cliente } = await supabase
			.from('cliente')
			.select('*');

		if (err_cliente) {
			console.error(err_cliente);
			throw error(404, err_cliente.message);
		}

		return { clientes, form };
	}

	const { data, error: err } = await supabase
		.from('cliente')
		.select('*')
		.eq('id', id)
		.single();

	if (err) {
		console.error(err);
		return fail(404, {
			form: await superValidate(zod(formSchema)),
		});
	}

	form.data = {
		id: data.id,
		nome: data.nome,
		celular: data.celular,
		telefone_fixo: data.telefone_fixo ?? '',
		cpf_cnpj: data.cpf_cnpj ?? '',
		data_nascimento: data.data_nascimento ?? '',
		email: data.email ?? '',
		rg_ie: data.rg_ie ?? '',
	};

	return {
		form,
	};
};

export const actions: Actions = {
	default: async (event) => {
		console.log('ACTION: cliente');

		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}
		const formData = form.data;
		console.log(formData);

		let err;
		if (formData.id) {
			const { data, error: err } = await supabase
				.from('cliente')
				.update(formData)
				.eq('id', formData.id);
		} else {
			const { data, error: err } = await supabase
				.from('cliente')
				.insert(formData);
		}

		if (err) {
			console.error(err);
			return fail(400, {
				form,
			});
		}

		return {
			form,
		};
	},
};
