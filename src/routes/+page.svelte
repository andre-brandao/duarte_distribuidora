<script lang="ts">
	import type { PageData } from './$types';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Trigger } from '$lib/components/ui/dropdown-menu';

	export let data: PageData;

	const clientes = data.clientes;
	const produtos = data.produtos;
	const tipo_pedidos = ['Pedidos Delivery', 'Comandas'];
	const pedidos_caixa = {
		num_pedido: 0,
		datahora_pedido: '',
		em_aberto: true,
		criado_por: 'User',
		itens_pedido: ['Item 1', 'Item 2'],
		valor_total: 0
	};
</script>

<main class="container flex h-screen items-center justify-center gap-2">
	<div class="flex flex-col">
		<a href="/produtos" class="rounded-lg bg-red-300 p-3 hover:bg-primary"> BETA produtos </a>
		{#each clientes ?? [] as client}
			<a href="/cliente/{client.id}" class="hover:underline"> {client.nome}</a>
		{/each}
	</div>
	<div class="flex flex-col">
		<a href="/cliente" class="rounded-lg bg-blue-300 p-3 hover:bg-primary"> BETA cliente </a>
		{#each produtos ?? [] as prod}
			<a href="/produtos/{prod.id}" class="hover:underline">{prod.nome}</a>
		{/each}
	</div>
	<div>
		<a href="/estoque" class="rounded-lg bg-green-300 p-3 hover:bg-primary"> BETA estoque </a>
	</div>
	{#each tipo_pedidos as dialog (dialog)}
		<Dialog.Root>
			<Dialog.Trigger class={buttonVariants({ variant: 'brenovar' })}>{dialog}</Dialog.Trigger>
			<Dialog.Content class="sm:max-w-[1300px]">
				<Dialog.Header>
					<div class="grid gap-4 py-4">
						<div class="grid grid-cols-4 items-center gap-4">
							<Dialog.Title>{dialog}</Dialog.Title>
						</div>
						<div>
							<Input id="name" placeholder="Pesquisar..." class="col-span-1" />
						</div>
					</div>
				</Dialog.Header>
				<Dialog.Footer>
					<Button type="submit">Save changes</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	{/each}

	<Dialog.Root>
		<Dialog.Trigger
			class={buttonVariants({ variant: 'brenovar' })}
			on:click={() =>
				(pedidos_caixa.datahora_pedido = new Date().toLocaleString('pt-BR', {
					day: '2-digit',
					month: '2-digit',
					hour: '2-digit',
					minute: '2-digit'
				}))}>Pedidos no caixa</Dialog.Trigger
		>
		<Dialog.Content class="sm:max-w-[1000px]">
			<Dialog.Header>
				<div class="gap-0 py-1">
					<div class="items-center gap-0">
						<Dialog.Title class="text-center text-3xl">Pedido no caixa</Dialog.Title>
					</div>
				</div>
			</Dialog.Header>
			<div class="row flex items-center justify-between gap-2 text-center">
				<p>Numero do pedido #{pedidos_caixa.num_pedido}</p>
				<p>Pedido iniciado {pedidos_caixa.datahora_pedido}</p>
				<Input
					id="name"
					placeholder="Pesquisar produto..."
					class="col-span-1 h-auto w-auto px-2 py-1"
				/>
				<Button>Acessar Produtos</Button>
			</div>
			<div class="row">
				<div class="col">
					<!--Criado por: - observacao input -->
					<div class="row">
						<!--Botão vincular cliente - mais opcoes -->
					</div>
				</div>
				<div class="col">
					<!--itens do pedido - total - subtotal-->
				</div>
			</div>

			<div class="row">
				<div class="col"></div>
				<!--cancelar-->
				<div class="col"></div>
				<!--Imprimir - pagamento-->
			</div>
		</Dialog.Content>
	</Dialog.Root>
</main>
