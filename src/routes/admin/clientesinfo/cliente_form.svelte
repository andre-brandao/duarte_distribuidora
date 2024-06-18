<script lang="ts">
	import Label from '$lib/components/ui/label/label.svelte'
	import { Input } from '$lib/components/ui/input'
	import { CalendarIcon } from 'lucide-svelte/icons'
	import { Calendar } from '$lib/components/ui/calendar'

	import {
		type DateValue,
		DateFormatter,
		getLocalTimeZone,
	} from '@internationalized/date'
	import { cn } from '$lib/utils.js'
	import { Button } from '$lib/components/ui/button/index.js'
	import * as Popover from '$lib/components/ui/popover'

	let person_type = 'Pessoa Fisica'

	const df = new DateFormatter('en-US', {
		dateStyle: 'long',
	})

	let value: DateValue | undefined = undefined
</script>

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
			<Input id="nome" placeholder="Seu nome" class="mt-2" />
			<p class="mt-1 text-[0.8rem] text-muted-foreground">Nome do Cliente.</p>
		</div>

		<div>
			<Label for="email">Email</Label>
			<Input id="email" placeholder="exemplo@gmail.com" class="mt-2" />
			<p class="mt-1 text-[0.8rem] text-muted-foreground">Email do cliente.</p>
		</div>
	</div>
	<div class="mb-3">
		<div class="w-full">
			<Input
				placeholder="Digite o {person_type === 'Pessoa Juridica'
					? 'CNPJ'
					: 'CPF'}"
			/>
			<p class="mt-1 text-[0.8rem] text-muted-foreground">
				{person_type === 'Pessoa Juridica' ? 'CNPJ' : 'CPF'} do cliente.
			</p>
		</div>
	</div>
	<div class="mb-3 flex gap-2">
		<div>
			<Label for="celular">Celular*</Label>
			<Input id="celular" placeholder="(00) 00000-0000" class="mt-2" />
			<p class="mt-1 text-[0.8rem] text-muted-foreground">
				Celular pessoal do cliente.
			</p>
		</div>

		<div>
			<Label for="telefone_fixo">Telefone Fixo</Label>
			<Input id="telefone_fixo" placeholder="0000-0000" class="mt-2" />
			<p class="mt-1 text-[0.8rem] text-muted-foreground">
				Telefone fixo do cliente.
			</p>
		</div>
	</div>

	<div class="mb-3 flex flex-col gap-2">
		<Label for="data_nascimento">Data de nascimento</Label>
		<Popover.Root>
			<Popover.Trigger asChild let:builder>
				<Button
					variant="outline"
					class={cn(
						'w-full justify-start text-left font-normal',
						!value && 'text-muted-foreground',
					)}
					builders={[builder]}
				>
					<CalendarIcon class="mr-2 h-4 w-4" />
					{value
						? df.format(value.toDate(getLocalTimeZone()))
						: 'Data de nascimento'}
				</Button>
			</Popover.Trigger>
			<Popover.Content class="w-auto p-0">
				<Calendar bind:value initialFocus />
			</Popover.Content>
		</Popover.Root>
		<p class="mt-1 text-[0.8rem] text-muted-foreground">
			Data de nascimento é usado para calcular sua idade.
		</p>
		<input hidden name="data_nascimento" />
	</div>

	<div class="mb-3 flex flex-col gap-2">
		<Label for="rg_ie"
			>{person_type === 'Pessoa Juridica' ? 'IE' : 'RG'} do cliente</Label
		>
		<Input
			id="rg_ie"
			placeholder="Digite o {person_type === 'Pessoa Juridica' ? 'IE' : 'RG'}"
		/>
		<p class="mt-1 text-[0.8rem] text-muted-foreground">
			{person_type === 'Pessoa Juridica' ? 'IE' : 'RG'} do cliente.
		</p>
	</div>

	<Button class="w-full">Cadastrar cliente</Button>
</div>
