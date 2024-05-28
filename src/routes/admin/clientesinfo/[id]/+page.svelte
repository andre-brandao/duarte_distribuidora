<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { formatDate } from '$lib/utils';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let { supabase } = data;
	$: ({ supabase } = data);

	let novo_cliente = data.clientes;
	let pedido = data.pedido;

	let clientes = { ...novo_cliente };

	let isChanged = false;

	function checkChanges() {
		isChanged = JSON.stringify(clientes) !== JSON.stringify(novo_cliente);
	}

	async function updateCliente() {
		if (novo_cliente.nome.length < 3) {
			toast.error('Nome precisa de 3 ou mais caracteres.');
			return
		}

		const { error: err } = await supabase
			.from('cliente')
			.update(novo_cliente)
			.eq('id', novo_cliente.id);

		if (err) {
			toast.error(err.message);
			return;
		}
		toast.success('cliente atualizado com suesso');
		isChanged = false;
	}
</script>

<main class="min-h-screen bg-white">
	<div class="mx-auto mb-6 w-fit rounded-xl border bg-gray-100 p-4 shadow-sm">
		<div class="md:flex">
			<div class="md:flex-shrink-0">
				<div class="mb-2 text-gray-600">
					<strong>Data de Criação:</strong>
					<span on:input={checkChanges}
						>{formatDate(novo_cliente.created_at)}</span
					>
				</div>
				<div class="mb-4 flex flex-col text-2xl font-bold md:flex-row">
					ID: {novo_cliente.id} -
					<div class="md:ml-2">
						<input
							type="text"
							bind:value={novo_cliente.nome}
							on:input={checkChanges}
							class="editable-input"
							placeholder="Não informada"
						/>
					</div>
				</div>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div class=" text-gray-600">
						<strong>CPF/CNPJ:</strong>
						<input
							type="text"
							bind:value={novo_cliente.cpf_cnpj}
							on:input={checkChanges}
							class="editable-input"
							placeholder="Não informada"
						/>
					</div>
					<div class=" text-gray-600">
						<strong>RG/IE:</strong>
						<input
							type="text"
							bind:value={novo_cliente.rg_ie}
							on:input={checkChanges}
							class="editable-input"
							placeholder="Não informado"
						/>
					</div>

					<div class=" text-gray-600">
						<strong>E-mail:</strong>
						<input
							type="email"
							bind:value={novo_cliente.email}
							on:input={checkChanges}
							class="editable-input"
							placeholder="Não informado"
						/>
					</div>
					<div class=" text-gray-600">
						<strong>Celular:</strong>
						<input
							type="text"
							bind:value={novo_cliente.celular}
							on:input={checkChanges}
							class="editable-input"
							placeholder="Não informada"
						/>
					</div>
					<div class=" text-gray-600">
						<strong>Fixo:</strong>
						<input
							type="text"
							bind:value={novo_cliente.telefone_fixo}
							on:input={checkChanges}
							class="editable-input"
							placeholder="Não informado"
						/>
					</div>
					<div class=" text-gray-600">
						<strong>Data de Nascimento:</strong>
						<input
							type="date"
							bind:value={novo_cliente.data_nascimento}
							on:input={checkChanges}
							class="editable-input"
							placeholder="Não informada"
						/>
					</div>
				</div>
				<div class="mt-4 flex w-full items-center justify-between gap-2">
					<div
						class="block w-fit rounded-lg bg-primary p-2 text-lg font-semibold text-black"
						on:input={checkChanges}
					>
						Crédito: {novo_cliente.credito_usado} /
						<input
							type="text"
							class="editable-input-2 ml-1"
							bind:value={novo_cliente.credito_maximo}
							on:input={checkChanges}
							placeholder="Máximo"
						/>
					</div>
					{#if isChanged}
						<button
							on:click={updateCliente}
							class="block w-fit rounded-lg bg-primary p-2 text-center font-semibold text-black"
						>
							Salvar informações
						</button>
					{/if}
				</div>
			</div>
		</div>
	</div>
	{#each pedido as ped}
		<div class=" mt-4 rounded-lg border bg-gray-100 p-6 shadow-sm">
			<div class="mb-4 flex gap-2 text-center text-lg">
				<h3>Pedido <strong>#{ped.id}</strong> -</h3>
				<p>Total: <strong>R${ped.total_in_cents}</strong> -</p>
				<p>Tipo do pedido: <strong>{ped.tipo}</strong></p>
			</div>
			<div>
				<h4 class="mb-2 text-lg font-semibold">Produtos pedidos:</h4>
				<div
					class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
				>
					{#each ped.produto_pedido as produto}
						<div class="flex rounded-md bg-white p-2 shadow-sm">
							<p class="text-gray-800">
								{produto.quantidade}x -
								{produto.var_produto?.produto?.nome}
								{produto.var_produto?.categoria?.nome} -
								<span class="font-bold text-green-500">
									R${produto.total_in_cents}
								</span>
							</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/each}
</main>

<style>
	.editable-input {
		border: none;
		background: transparent;
		color: inherit;
		font-size: inherit;
		width: 100%;
		padding: 0;
		margin: 0;
		outline: none;
		border-bottom: 1px solid transparent;
		transition: border-bottom-color 0.2s;
	}
	.editable-input {
		border-bottom-color: #000;
		transition: border-bottom-color 0.3s ease;
	}
	.editable-input:focus {
		border-bottom-color: #facc15;
	}
	.editable-input::placeholder {
		color: #a8a8a8;
	}

	.editable-input-2 {
		border: none;
		background: transparent;
		font-size: inherit;
		width: auto;
		max-width: 80px;
		padding: 0;
		margin: 0;
		outline: none;
		border-bottom: 1px solid transparent;
		transition: border-bottom-color 0.2s;
	}
</style>
