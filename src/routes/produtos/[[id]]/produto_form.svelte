<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
  import NumberInput from '$lib/components/ui/input/number_input.svelte';
	import { formSchema, type FormSchema } from '$lib/schemas/produto_schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema),
		dataType: 'json',
		delayMs: 500
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="outline outline-primary p-4 rounded-xl">

  <h1 class="text-center font-bold underline text-2xl">Cadastro Produto</h1>

	<Form.Field {form} name="nome">
		<Form.Control let:attrs>
			<Form.Label>Nome</Form.Label>
			<Input {...attrs} bind:value={$formData.nome} />
		</Form.Control>

		<Form.Description>Nome do Produto.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="descricao">
		<Form.Control let:attrs>
			<Form.Label>Descrição</Form.Label>
			<Input {...attrs} bind:value={$formData.descricao} />
		</Form.Control>

		<Form.Description>Uma breve descrição do produto para atrair o cliente.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<div class="flex gap-2">
		<Form.Field {form} name="preco_varejo">
			<Form.Control let:attrs>
				<Form.Label>Preço varejo:</Form.Label>
				<NumberInput {...attrs} type='number' bind:value={$formData.preco_varejo} />
			</Form.Control>

			<!-- <Form.Description>Uma breve descrição do produto para atrair o cliente.</Form.Description> -->
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="preco_atacado">
			<Form.Control let:attrs>
				<Form.Label>Preço atacado:</Form.Label>
				<NumberInput {...attrs}  bind:value={$formData.preco_atacado} />
			</Form.Control>

			<!-- <Form.Description>Uma breve descrição do produto para atrair o cliente.</Form.Description> -->
			<Form.FieldErrors />
		</Form.Field>
	</div>
	<Form.Button class='w-full'>Salvar</Form.Button>
</form>
