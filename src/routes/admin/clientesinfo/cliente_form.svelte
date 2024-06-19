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
	import { toast } from 'svelte-sonner'
	import type { SupabaseClient } from '@supabase/supabase-js'
	import type { Database } from '$lib/supabase-types'

	export let supabase: SupabaseClient<Database>

	const df = new DateFormatter('en-US', {
		dateStyle: 'long',
	})

	let value: DateValue | undefined = undefined

	let formNovoCliente = {
		celular: '',
		cpf_cnpj: '',
		data_nascimento: '',
		email: '',
		nome: '',
		rg_ie: '',
		telefone_fixo: '',
		tipo_pessoa: 'fisica',
	}

	let erros = {
		celular: '',
		cpf_cnpj: '',
		data_nascimento: '',
		email: '',
		nome: '',
		rg_ie: '',
		telefone_fixo: '',
		tipo_pessoa: 'fisica',
	}

	export let clientes: {
		celular: string
		cpf_cnpj: string | null
		created_at: string
		credito_maximo: number
		credito_usado: number
		data_nascimento: string | null
		email: string | null
		id: number
		nome: string
		rg_ie: string | null
		telefone_fixo: string | null
		tipo_pessoa: string
	}[] = []

	export let criaCliente = (cliente: any) => {}

	async function cadastrarCliente() {
		console.log('cadastrar cliente')
		if (formNovoCliente.nome.length < 3) {
			erros.nome = 'Nome do cliente deve ter no mínimo 3 caracteres'
			return
		}

		if (formNovoCliente.celular.length < 3) {
			erros.celular = 'Celular do cliente é obrigatorio'
			return
		}

		if (formNovoCliente.tipo_pessoa === 'fisica') {
			if (formNovoCliente.cpf_cnpj.length != 11) {
				erros.cpf_cnpj =
					'CPF deve conter apenas 11 digitos, sem hífens e pontos'
					return
			}
		}
		if (formNovoCliente.tipo_pessoa === 'juridica') {
			if (formNovoCliente.cpf_cnpj.length != 14) {
				erros.cpf_cnpj =
					'CNPJ deve conter apenas 14 digitos, sem hífens(-), pontos(.) e barras(/)'
					return
			}
		}

		if (formNovoCliente.rg_ie === 'RG') {
			if(formNovoCliente.rg_ie.length <14) {
				erros.rg_ie = 'Insira um RG de tamanho válido'
				return
			}
		}
		
		const { data, error } = await supabase
			.from('cliente')
			.insert({
				nome: formNovoCliente.nome,
				email: formNovoCliente.email,
				celular: formNovoCliente.celular,
				cpf_cnpj: formNovoCliente.cpf_cnpj,
				rg_ie: formNovoCliente.rg_ie,
				telefone_fixo: formNovoCliente.telefone_fixo,
				tipo_pessoa: formNovoCliente.tipo_pessoa,
			})
			.select('*')
			.single()

		if (error) {
			toast.error(error.message)
			return
		}

		criaCliente(data)

		clientes = [...clientes, data]

		formNovoCliente = {
			celular: '',
			cpf_cnpj: '',
			data_nascimento: '',
			email: '',
			nome: '',
			rg_ie: '',
			telefone_fixo: '',
			tipo_pessoa: 'fisica',
		}
	}
</script>

<div>
	<h1
		class="self-center whitespace-nowrap pb-8 text-center text-2xl font-semibold"
	>
		Formulário cadastro
	</h1>

	<div class="mb-3 flex flex-col items-center justify-center gap-2">
		<Label>Tipo de pessoa:</Label>
		<div class="flex gap-3">
			{#each ['fisica', 'juridica'] as option}
				<Label>
					<input
						type="radio"
						name="cpf_cnpj"
						value={option}
						bind:group={formNovoCliente.tipo_pessoa}
					/>
					{option}
				</Label>
			{/each}
		</div>
	</div>
	<div class="mb-3 flex gap-2">
		<div>
			<Label for="nome">Nome*</Label>
			<Input
				id="nome"
				placeholder="Seu nome"
				class="mt-2"
				bind:value={formNovoCliente.nome}
			/>
			<p class="mt-1 text-[0.8rem] text-muted-foreground">Nome do Cliente.</p>
		</div>

		<div>
			<Label for="email">Email</Label>
			<Input
				id="email"
				type="email"
				name="email"
				placeholder="exemplo@gmail.com"
				class="mt-2"
				bind:value={formNovoCliente.email}
			/>
			<p class="mt-1 text-[0.8rem] text-muted-foreground">Email do cliente.</p>
		</div>
	</div>
	<div class="mb-3">
		<div class="w-full">
			<Input
				placeholder="Digite o {formNovoCliente.tipo_pessoa === 'juridica'
					? 'CNPJ'
					: 'CPF'}"
				bind:value={formNovoCliente.cpf_cnpj}
			/>
			<p class="mt-1 text-[0.8rem] text-muted-foreground">
				{formNovoCliente.tipo_pessoa === 'juridica' ? 'CNPJ' : 'CPF'} do cliente.
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
				bind:value={formNovoCliente.celular}
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
				bind:value={formNovoCliente.telefone_fixo}
			/>
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
			>{formNovoCliente.tipo_pessoa === 'juridica' ? 'IE' : 'RG'} do cliente</Label
		>
		<Input
			id="rg_ie"
			placeholder="Digite o {formNovoCliente.tipo_pessoa === 'juridica'
				? 'IE'
				: 'RG'}"
			bind:value={formNovoCliente.rg_ie}
		/>
		<p class="mt-1 text-[0.8rem] text-muted-foreground">
			{formNovoCliente.tipo_pessoa === 'juridica' ? 'IE' : 'RG'} do cliente.
		</p>
	</div>

	<Button class="w-full" on:click={cadastrarCliente}>Cadastrar cliente</Button>
</div>
