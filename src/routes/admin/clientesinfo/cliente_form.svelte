<script lang="ts">
	import Label from '$lib/components/ui/label/label.svelte'
	import DatePicker from '$lib/components/ui/DatePicker.svelte'
	import * as Form from '$lib/components/ui/form'
	import { Input } from '$lib/components/ui/input'
	import NumberInput from '$lib/components/ui/input/number_input.svelte'
	import { formSchema, type FormSchema } from '$lib/schemas/cliente_schema'
	import {
		type SuperValidated,
		type Infer,
		superForm,
	} from 'sveltekit-superforms'
	import { zodClient } from 'sveltekit-superforms/adapters'

	import { CalendarIcon } from 'lucide-svelte/icons'
	import { Calendar } from '$lib/components/ui/calendar'

	import {
		type DateValue,
		DateFormatter,
		getLocalTimeZone,
		parseDate,
		CalendarDate,
		today,
	} from '@internationalized/date'
	import { cn } from '$lib/utils.js'
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js'
	import * as Popover from '$lib/components/ui/popover'

	let person_type = 'Pessoa Fisica'

	export let data: SuperValidated<Infer<FormSchema>>

	const form = superForm(data, {
		validators: zodClient(formSchema),
		dataType: 'json',
		delayMs: 500,
	})

	const { form: formData, enhance, delayed } = form

	const df = new DateFormatter('pt-BR', {
		dateStyle: 'long',
	})

	$: value = $formData.data_nascimento
		? parseDate($formData.data_nascimento)
		: undefined
</script>

<form method="POST" use:enhance>
	<div>
		<h1
			class="self-center whitespace-nowrap pb-8 text-center text-2xl font-semibold"
		>
			Formulário cadastro
		</h1>

		<div class="mb-3 flex items-center gap-3">
			<Label>Tipo de pessoa:</Label>
			{#each ['Pessoa Fisica', 'Pessoa Juridica'] as option}
				<Label>
					<input
						type="radio"
						name="cpf_cnpj"
						value={option}
						bind:group={person_type}
					/>
					{option}
				</Label>
			{/each}
		</div>
		<div class="mb-3 flex gap-2">
			<div>
				<Label for="nome">Nome*</Label>
				<Input
					id="nome"
					placeholder="Seu nome"
					class="mt-2"
					bind:value={$formData.nome}
				/>
				<p class="mt-1 text-[0.8rem] text-muted-foreground">Nome do Cliente.</p>
			</div>

			<div>
				<Label for="email">Email</Label>
				<Input
					id="email"
					placeholder="exemplo@gmail.com"
					class="mt-2"
					bind:value={$formData.email}
				/>
				<p class="mt-1 text-[0.8rem] text-muted-foreground">
					Email do cliente.
				</p>
			</div>
		</div>
		<div class="mb-3">
			<div class="w-full">
				<Input
					placeholder="Digite o {person_type === 'Pessoa Juridica'
						? 'CNPJ'
						: 'CPF'}"
					bind:value={$formData.cpf_cnpj}
				/>
				<p class="mt-1 text-[0.8rem] text-muted-foreground">
					{person_type === 'Pessoa Juridica' ? 'CNPJ' : 'CPF'} do cliente.
				</p>
			</div>
		</div>
		<div class="mb-3 flex gap-2">
			<div>
				<Label for="celular">Celular*</Label>
				<Input
					id="celular"
					placeholder="(00) 00000-0000"
					class="mt-2"
					bind:value={$formData.celular}
				/>
				<p class="mt-1 text-[0.8rem] text-muted-foreground">
					Celular pessoal do cliente.
				</p>
			</div>

			<div>
				<Label for="telefone_fixo">Telefone Fixo</Label>
				<Input
					id="telefone_fixo"
					placeholder="0000-0000"
					class="mt-2"
					bind:value={$formData.telefone_fixo}
				/>
				<p class="mt-1 text-[0.8rem] text-muted-foreground">
					Telefone fixo do cliente.
				</p>
			</div>
		</div>

		<div class="mb-3 flex flex-col gap-2">
			<Label for="data_nascimento">Data de nascimento</Label>
			<Popover.Root>
				<Popover.Trigger
					class={cn(
						buttonVariants({ variant: 'outline' }),
						'w-full justify-start pl-4 text-left font-normal',
						!$formData.data_nascimento && 'text-muted-foreground',
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
								$formData.data_nascimento = v.toString()
							} else {
								$formData.data_nascimento = ''
							}
						}}
					/>
				</Popover.Content>
			</Popover.Root>
			<p class="mt-1 text-[0.8rem] text-muted-foreground">
				Data de nascimento é usado para calcular sua idade.
			</p>
			<input hidden value={$formData.data_nascimento} name="data_nascimento" />
		</div>

		<div class="mb-3 flex flex-col gap-2">
			<Label for="rg_ie"
				>{person_type === 'Pessoa Juridica' ? 'IE' : 'RG'} do cliente</Label
			>
			<Input
				id="rg_ie"
				placeholder="Digite o {person_type === 'Pessoa Juridica' ? 'IE' : 'RG'}"
				bind:value={$formData.rg_ie}
			/>
			<p class="mt-1 text-[0.8rem] text-muted-foreground">
				{person_type === 'Pessoa Juridica' ? 'IE' : 'RG'} do cliente.
			</p>
		</div>

		<Button class="w-full" disabled={$delayed}>
			{#if $delayed}
				...
			{:else}
				Cadastrar cliente
			{/if}
		</Button>
	</div>
</form>
