<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let clientes = data.clientes;
	let pedido = data.pedido;
</script>

<main class="p-4 sm:ml-64">
	<div class="gap-0 py-1">
		<div
			class="m-3 mx-auto w-auto overflow-hidden rounded-xl bg-white shadow-md md:max-w-fit"
		>
			<div class="md:flex">
				<div class="p-8">
					<h2 class="text-xl font-semibold">
						ID: {clientes.id} - {clientes.nome || 'Não informada'}
					</h2>
					<p class="mt-2 text-gray-500">
						CPF/CNPJ: {clientes.cpf_cnpj || 'Não informada'} - RG/IE: {clientes.rg_ie ||
							'Não informado'}
					</p>
					<p class="mt-2 text-gray-500">
						E-mail: {clientes.email || 'Não informado'}
					</p>
					<p class="mt-2 text-gray-500">
						Celular: {clientes.celular || 'Não informada'} - Fixo: {clientes.telefone_fixo ||
							'Não informado'}
					</p>
					<p class="mt-2 text-gray-500">
						Data de Nascimento: {clientes.data_nascimento || 'Não informada'}
					</p>
					<p class="mt-2 text-gray-500">
						Data de Criação: {clientes.created_at}
					</p>
				</div>
			</div>
		</div>

		{#each pedido as item}
			<div class="ml-100 mt-3 text-center text-lg">
				<h1>{item.total_in_cents}</h1>
				<h1>{item.tipo}</h1>
				<h1>{item.id}</h1>
				<h1>{item.cliente_id}</h1>
			</div>
		{/each}
	</div>
</main>
