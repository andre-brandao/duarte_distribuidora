<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import type { PageData } from '../clientesinfo/$types';
	import { formatM } from '$lib/utils';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import ProdutoForm from './cliente_form.svelte';

	export let data: PageData;

	let clientes = data.clientes;

	
</script>

<main class="mx-auto">
	<div class="gap-0 py-1">
		<div class="flex items-center justify-between gap-0 pb-7">
			<h1 class="text-center text-4xl font-bold">Informações de clientes</h1>
			<Dialog.Root>
				<Dialog.Trigger class={buttonVariants({ variant: 'default' })}
					>Adicionar cliente</Dialog.Trigger
				>
				<Dialog.Content class="sm:max-w-[500px]">
					<ProdutoForm data={data.form}/>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	</div>
	<div class="overflow-x-auto">
		<table class="min-w-full border border-gray-300 leading-normal">
			<thead>
				<tr class="border-b border-gray-300 bg-gray-100">
					<th
						class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700"
						>ID</th
					>
					<th
						class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700"
						>Nome</th
					>
					<th
						class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700"
						>Celular</th
					>
					<th
						class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700"
						>CPF/CNPJ</th
					>
					<th
						class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700"
						>Crédito</th
					>
					<th
						class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700"
						>Informações completas
					</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200 bg-white">
				{#each clientes as cliente}
					<tr>
						<td class="px-6 py-4 text-sm text-gray-900">{cliente.id}</td>
						<td class="px-6 py-4 text-sm text-gray-900"
							>{cliente.nome ?? 'Não cadastrado'}</td
						>
						<td class="px-6 py-4 text-sm text-gray-900"
							>{cliente.celular ?? 'Não cadastrado'}</td
						>
						<td class="px-6 py-4 text-sm text-gray-900"
							>{cliente.cpf_cnpj ?? 'Não cadastrado'}</td
						>
						<td class="px-6 py-4 text-sm text-gray-900"
							>R${formatM(cliente.credito_usado)} - R${formatM(
								cliente.credito_maximo,
							)}</td
						>
						<td class="px-6 py-4 text-sm text-gray-900"
							><a
								href="/admin/clientesinfo/{cliente.id}"
								class="hover:underline"><Button>Visualizar e editar</Button></a
							></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<!-- {#if clientes}
		<div class="flex justify-center">
			<div class="overflow-x-auto">
				<DataTable {clientes} />
			</div>
		</div>
	{:else}
		<p>Nenhum cliente encontrado!</p>
	{/if} -->
</main>
