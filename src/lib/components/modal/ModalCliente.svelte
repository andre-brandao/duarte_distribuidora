<script lang="ts">
	import ButtonCliente from '$lib/components/buttons/ButtonCliente.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import CardCliente from '$lib/components/card/CardCliente.svelte';
	import { UserPlus } from 'lucide-svelte';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { Database } from '$lib/supabase-types';
	import { toast } from 'svelte-sonner';
	import { mask } from '$lib/utils';

	export let supabase: SupabaseClient<Database>;

	export let clientes: {
		celular: string;
		cpf_cnpj: string | null;
		created_at: string;
		data_nascimento: string | null;
		email: string | null;
		id: number;
		nome: string;
		rg_ie: string | null;
		telefone_fixo: string | null;
	}[];

	let search = '';
	$: clientesFiltrados = clientes.filter((c) => {
		if (search.length === 0) {
			return true;
		}
		if (
			search &&
			c.nome.toLocaleLowerCase().includes(search.toLocaleLowerCase())
		) {
			return true;
		}
		return false;
	});

	let formNovoCliente = {
		nome: '',
		email: '',
		celular: '',
	};

	async function cadastrarCliente() {
		console.log('cadastrar cliente');
		if (formNovoCliente.nome.length < 3) {
			toast.error('Nome do cliente deve ter no mínimo 3 caracteres');
		}

		if (formNovoCliente.celular.length < 3) {
			toast.error('Celular do cliente é obrigatorio');
		}

		const { data, error } = await supabase
			.from('cliente')
			.insert({
				nome: formNovoCliente.nome,
				email: formNovoCliente.email,
				celular: formNovoCliente.celular,
			})
			.select('*')
			.single();

		if (error) {
			toast.error(error.message);
			return;
		}

		clientes = [...clientes, data];
		formNovoCliente = {
			nome: '',
			email: '',
			celular: '',
		};
	}
</script>

<Dialog.Root>
	<Dialog.Trigger class="w-full">
		<ButtonCliente label={'Vincular compra a cliente'} Icon={UserPlus} />
	</Dialog.Trigger>
	<Dialog.Content class="flex h-[500px] overflow-hidden sm:max-w-[650px]">
		<div class="w-full overflow-y-auto">
			<Dialog.Header class="sticky top-0 bg-white">
				<div class="gap-0 pb-5">
					<div class=" flex items-center justify-between gap-0 pr-5">
						<Dialog.Title class="pr-3 text-center text-3xl"
							>Vincular a um cliente:</Dialog.Title
						>
						<Input
							id="name"
							placeholder="Pesquisar cliente..."
							class="col-span-1 h-auto w-auto py-1"
							bind:value={search}
						/>
					</div>
				</div>
			</Dialog.Header>
			<div class="grid pr-5">
				<hr />
				{#each clientesFiltrados as cliente (cliente.id)}
					<CardCliente {cliente} on:cliente_selecionado />
				{/each}
			</div>
			<div
				class="mr-5 mt-5 flex flex-col items-center justify-center gap-3 rounded bg-gray-100 p-5"
			>
				<p class="font-bold">Novo Cliente:</p>
				<Input placeholder="Nome" bind:value={formNovoCliente.nome} />
				<Input placeholder="Email" bind:value={formNovoCliente.email} />
				<input
					use:mask={{ mask: ' (99) 99999-9999' }}
					bind:value={formNovoCliente.celular}
					type="text"
					placeholder="Celular"
					class=" flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
				/>
				<Button on:click={cadastrarCliente}>Cadastrar cliente</Button>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
