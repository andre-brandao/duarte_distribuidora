import type { Actions, PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '$lib/schemas/cliente_schema.js';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const id_cliente = params.id;

	let form = await superValidate(zod(formSchema));

	if (!id_cliente) {
		return {
			form
		};
	}

	const { data, error: err } = await supabase
		.from('cliente')
		.select('*')
		.eq('id', id_cliente)
		.single();

	if (err) {
		console.error(err);
		return fail(404, {
			form: await superValidate(zod(formSchema))
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
		rg_ie: data.rg_ie ?? ''
	};
	// console.log(form);

	return {
		form
	};
};

export const actions: Actions = {
	default: async (event) => {
		console.log('ACTION: cliente');

		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			// FORM INVALIDO
			return fail(400, {
				form
			});
		}
		const formData = form.data;
		console.log(formData);

		let err;
		if (formData.id) {
			// UPDATE
			console.log('UPDATE', formData);

			const { data, error: err } = await supabase
				.from('cliente')
				.update(formData)
				.eq('id', formData.id);
		} else {
			// INSERT
			console.log('INSERT', formData);
			const { data, error: err } = await supabase.from('cliente').insert(formData);
		}

		if (err) {
			// ERRO AO SALVAR NO BANCO DADOS
			console.error(err);
			return fail(400, {
				form
			});
		}

		return {
			form
		};
	}
};
