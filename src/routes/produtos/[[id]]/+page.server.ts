import type { Actions, PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '$lib/schemas/produto_schema.js';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail } from '@sveltejs/kit';

// TODO CHANGE DB
import { supabase } from '$lib/supabaseClient.js';

export const load: PageServerLoad = async ({ params }) => {
	const id_cliente = params.id;

	let form = await superValidate(zod(formSchema));

	if (!id_cliente) {
		return {
			form
		};
	}

	const { data, error: err } = await supabase
		.from('produtos')
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
		descricao: data.descricao,
		preco_atacado: data.preco_atacado,
		preco_varejo: data.preco_varejo
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
				.from('produtos')
				.update(formData)
				.eq('id', formData.id);
		} else {
			// INSERT
			console.log('INSERT', formData);
			const { data, error: err } = await supabase.from('produtos').insert(formData);
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
