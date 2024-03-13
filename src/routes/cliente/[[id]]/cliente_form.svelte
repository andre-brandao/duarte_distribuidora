<script lang="ts">
	import DatePicker from '$lib/components/ui/DatePicker.svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import NumberInput from '$lib/components/ui/input/number_input.svelte';
	import { formSchema, type FormSchema } from '$lib/schemas/cliente_schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import { CalendarIcon } from 'lucide-svelte/icons';
	import { Calendar } from '$lib/components/ui/calendar';

	import {
		type DateValue,
		DateFormatter,
		getLocalTimeZone,
		parseDate,
		CalendarDate,
		today
	} from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Popover from '$lib/components/ui/popover';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema),
		dataType: 'json',
		delayMs: 500
	});

	const { form: formData, enhance, delayed } = form;

	const df = new DateFormatter('pt-BR', {
		dateStyle: 'long'
	});

	$: value = $formData.data_nascimento ? parseDate($formData.data_nascimento) : undefined;
</script>

<form method="POST" use:enhance class="w-[400px] rounded-xl p-4 outline outline-primary">
	<h1 class="text-center text-2xl font-bold underline">Cadastro Cliente</h1>

	<Form.Field {form} name="nome">
		<Form.Control let:attrs>
			<Form.Label>Nome*</Form.Label>
			<Input {...attrs} bind:value={$formData.nome} />
		</Form.Control>

		<Form.Description>Nome do Produto.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} bind:value={$formData.email} />
		</Form.Control>

		<Form.Description>Email do cliente.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<div class="flex gap-1">
		<Form.Field {form} name="celular">
			<Form.Control let:attrs>
				<Form.Label>Celular*</Form.Label>
				<Input {...attrs} bind:value={$formData.celular} />
			</Form.Control>

			<Form.Description>Celular pessoal do cliente.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="telefone_fixo">
			<Form.Control let:attrs>
				<Form.Label>Telefone Fixo</Form.Label>
				<Input {...attrs} bind:value={$formData.telefone_fixo} />
			</Form.Control>

			<Form.Description>Telefone fixo do cliente.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<!-- data nascimento -->

	<Form.Field {form} name="data_nascimento" class="flex flex-col">
		<Form.Control let:attrs>
			<Form.Label>Data Nascimento</Form.Label>
			<Popover.Root>
				<Popover.Trigger
					{...attrs}
					class={cn(
						buttonVariants({ variant: 'outline' }),
						'w-full justify-start pl-4 text-left font-normal',
						!$formData.data_nascimento && 'text-muted-foreground'
					)}
				>
					{$formData.data_nascimento
						? df.format(value?.toDate(getLocalTimeZone()))
						: 'Escolha uma data'}
					<CalendarIcon class="ml-auto h-4 w-4 opacity-50 " />
				</Popover.Trigger>
				<Popover.Content class="w-auto p-0" side="top">
					<Calendar
						{value}
						minValue={new CalendarDate(1900, 1, 1)}
						maxValue={today(getLocalTimeZone())}
						calendarLabel="Date of birth"
						initialFocus
						onValueChange={(v) => {
							if (v) {
								$formData.data_nascimento = v.toString();
							} else {
								$formData.data_nascimento = '';
							}
						}}
					/>
				</Popover.Content>
			</Popover.Root>
			<Form.Description>Your date of birth is used to calculator your age</Form.Description>
			<Form.FieldErrors />
			<input hidden value={$formData.data_nascimento} name={attrs.name} />
		</Form.Control>
	</Form.Field>

	<!-- cpf cnpj -->

	<div class="flex gap-1">
		<Form.Field {form} name="cpf_cnpj">
			<Form.Control let:attrs>
				<Form.Label>CPF/CNPJ</Form.Label>
				<Input {...attrs} bind:value={$formData.cpf_cnpj} />
			</Form.Control>

			<Form.Description>CPF ou CNPJ do cliente.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="rg_ie">
			<Form.Control let:attrs>
				<Form.Label>RE ou IE</Form.Label>
				<Input {...attrs} bind:value={$formData.rg_ie} />
			</Form.Control>

			<Form.Description></Form.Description>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<Form.Button class="w-full" disabled={$delayed}>
		{#if $delayed}
			...
		{:else}
			Salvar
		{/if}
	</Form.Button>
</form>
