<script lang="ts">
	import Button from './../../../../lib/components/ui/button/button.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let clientes = data.clientes;
	let pedido = data.pedido;
</script>

<main class="min-h-screen bg-white">
	<div class="m-4">
		<div class="mb-6 rounded-xl bg-gray-100 p-4 shadow-lg">
			<div class="md:flex">
				<div class="md:flex-shrink-0">
					<div class="mb-4 flex flex-col text-2xl font-bold md:flex-row">
						ID: {clientes.id} -
						<div class="md:ml-2">
							<input
								type="text"
								bind:value={clientes.nome}
								class="editable-input"
								placeholder="Não informada"
							/>
						</div>
					</div>
					<p class="mb-2 text-gray-600">
						<strong>CPF/CNPJ:</strong>
						<input
							type="text"
							bind:value={clientes.cpf_cnpj}
							class="editable-input"
							placeholder="Não informada"
						/>
					</p>
					<p class="mb-2 text-gray-600">
						<strong>RG/IE:</strong>
						<input
							type="text"
							bind:value={clientes.rg_ie}
							class="editable-input"
							placeholder="Não informado"
						/>
					</p>
					<p class="mb-2 text-gray-600">
						<strong>E-mail:</strong>
						<input
							type="email"
							bind:value={clientes.email}
							class="editable-input"
							placeholder="Não informado"
						/>
					</p>
					<p class="mb-2 text-gray-600">
						<strong>Celular:</strong>
						<input
							type="text"
							bind:value={clientes.celular}
							class="editable-input"
							placeholder="Não informada"
						/>
					</p>
					<p class="mb-2 text-gray-600">
						<strong>Fixo:</strong>
						<input
							type="text"
							bind:value={clientes.telefone_fixo}
							class="editable-input"
							placeholder="Não informado"
						/>
					</p>
					<p class="mb-2 text-gray-600">
						<strong>Data de Nascimento:</strong>
						<input
							type="date"
							bind:value={clientes.data_nascimento}
							class="editable-input"
							placeholder="Não informada"
						/>
					</p>
					<p class="mb-2 text-gray-600">
						<strong>Data de Criação:</strong>
						<span>{clientes.created_at}</span>
					</p>

					<div class="mt-2 w-fit rounded-lg bg-primary p-2 text-black">
						<span class="block text-lg font-semibold">
							Crédito: {clientes.credito_usado} / {clientes.credito_maximo}
						</span>
					</div>
					<div class="mt-2">
						<Button>SALVAR INFORMACÕES</Button>
					</div>
				</div>
			</div>

			{#each pedido as ped}
				<div class=" mt-4 rounded-lg bg-white p-6 shadow-sm">
					<div class="mb-4 text-center text-lg flex gap-2">
						<h3>Pedido <strong>#{ped.id}</strong> -</h3>
						<p>Total: <strong>{ped.total_in_cents}</strong> -</p>
						<p>Tipo do pedido: <strong>{ped.tipo}</strong></p>
					</div>
					<div>
						<h4 class="mb-2 text-lg font-semibold">Produtos pedidos:</h4>
						<div
							class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
						>
							{#each ped.produto_pedido as produto}
								<div class="flex rounded-md bg-gray-200 p-2 shadow-sm">
									<p class="text-gray-800">
										QNTx -
										{produto.var_produto?.produto?.nome}
										{produto.var_produto?.categoria?.nome}
										<span class="font-bold text-green-500">
											- R${produto.unidade_in_cents}
										</span>
									</p>
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
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
	.editable-input:focus {
		border-bottom-color: #000;
	}
	.editable-input::placeholder {
		color: #9ca3af;
	}
</style>
