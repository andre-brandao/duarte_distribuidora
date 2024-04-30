<script lang="ts">
	import ButtonCliente from '$lib/components/buttons/ButtonCliente.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import CardCliente from '$lib/components/breninteste/card/CardCliente.svelte';
	import { UserPlus } from 'lucide-svelte';

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
					<CardCliente nome={cliente.nome} celular={cliente.celular} />
				{/each}
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
