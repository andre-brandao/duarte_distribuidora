<script lang="ts">
	import Label from './../../../lib/components/ui/label/label.svelte';
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

	//INICIO AQ
	let person_type = '';
	//FIM AQI

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

<form method="POST" use:enhance class="w-[500px] m-8">
	<div class="rounded-lg border border-gray-400 p-10 shadow-sm bg-gray-100">
		<h1
			class="self-center whitespace-nowrap pb-8 text-center text-2xl font-semibold dark:text-white"
		>
			Cadastro de Cliente
		</h1>
		<div class="flex gap-2">
			<Form.Field {form} name="nome">
				<Form.Control let:attrs>
					<Form.Label>Nome*</Form.Label>
					<Input {...attrs} bind:value={$formData.nome} />
				</Form.Control>

				<Form.Description>Nome do Cliente.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input placeholder="exemplo@gmail.com" {...attrs} bind:value={$formData.email} />
				</Form.Control>

				<Form.Description>Email do cliente.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
		</div>

		<!--Selecionar cnpj ou cpf-->
		<Form.Field {form}>
			<Form.Control>
				<Form.Label>
					{#each ['Pessoa Juridica', 'Pessoa Fisica'] as option}
						<label class="mr-3">
							<input type="radio" name="cpf_cnpj" value={option} bind:group={person_type} />
							{option}
						</label>
					{/each}
				</Form.Label>
			</Form.Control>
			<Form.Control let:attrs>
				<Input
					placeholder="Digite o {person_type === 'Pessoa Juridica' ? 'CNPJ' : 'CPF'}"
					{...attrs}
					bind:value={$formData.cpf_cnpj}
				/>
			</Form.Control>
			<Form.Description>CPF ou CNPJ do cliente.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<div class="flex gap-2">
			<Form.Field {form} name="celular">
				<Form.Control let:attrs>
					<Form.Label>Celular*</Form.Label>
					<Input placeholder="(00) 00000-0000" {...attrs} bind:value={$formData.celular} />
				</Form.Control>

				<Form.Description>Celular pessoal do cliente.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="telefone_fixo">
				<Form.Control let:attrs>
					<Form.Label>Telefone Fixo</Form.Label>
					<Input placeholder="0000-0000" {...attrs} bind:value={$formData.telefone_fixo} />
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
		<!-- <div class="flex gap-1">
			<Form.Field {form} name="cpf_cnpj">
				<Form.Control let:attrs>
					<Form.Label>CPF/CNPJ</Form.Label>
					<Input {...attrs} bind:value={$formData.cpf_cnpj} />
				</Form.Control>
	
				<Form.Description>CPF ou CNPJ do cliente.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
	
		</div> -->
		<Form.Field {form} name="rg_ie">
			<Form.Control let:attrs>
				<Form.Label>RE ou IE</Form.Label>
				<Input {...attrs} bind:value={$formData.rg_ie} />
			</Form.Control>

			<Form.Description></Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Button variant="brenosubmit" class="mt-4 w-full" disabled={$delayed}>
			{#if $delayed}
				...
			{:else}
				Cadastrar cliente
			{/if}
		</Form.Button>
	</div>
</form>
