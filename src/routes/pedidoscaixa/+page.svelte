<script lang="ts">
	import ButtonCardapio from './../../lib/components/buttonCardapio/ButtonCardapio.svelte';
	import type { PageData } from './$types';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { onMount } from 'svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import ModalProduto from '$lib/components/modal/ModalProduto.svelte';
	import { CirclePlus } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	import type { Icon } from 'lucide-svelte';

	//export let data: PageData;

	const pedidos_caixa = {
		num_pedido: 0,
		datahora_pedido: '',
		isOpen: true,
		criado_por: 'User',
		itens_pedido: [
			{ id: 1, nome: 'Item 1', preco: 10.0, categoria: 'Categoria 1' },
			{ id: 2, nome: 'Item 2', preco: 20.0, categoria: 'Categoria 2' },
			{ id: 3, nome: 'Item 3', preco: 30.0, categoria: 'Categoria 3' }
		],
		valor_total: 0
	};

	pedidos_caixa.valor_total = pedidos_caixa.itens_pedido.reduce(
		(total, item) => total + item.preco,
		0
	);

	onMount(() => {
		pedidos_caixa.datahora_pedido = new Date().toLocaleString('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			hour: '2-digit',
			minute: '2-digit'
		});
	});
</script>

<div class="p-4 sm:ml-64">
	<div class="rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
		<div class="">
			<div class="gap-0 py-1">
				<div class="items-center gap-0 pb-7">
					<h1 class="text-center text-4xl font-bold">Pedido no caixa</h1>
				</div>
			</div>
			<div class="row flex items-center justify-between gap-2">
				<div>
					<code class={`rounded px-3 py-1 ${pedidos_caixa.isOpen ? 'bg-green-500' : 'bg-red-500'}`}>
						{pedidos_caixa.isOpen ? 'Em aberto' : 'Fechado'}
					</code>
					<p class="pt-3">Numero do pedido #{pedidos_caixa.num_pedido}</p>
					<p class="pt-3">Pedido iniciado {pedidos_caixa.datahora_pedido}</p>
				</div>
				<ModalProduto />
			</div>
			<div class="row-auto my-8 flex gap-10">
				<div class="col-auto">
					<!--Criado por: - observacao input -->
					<p class="pb-6">Criado por: {pedidos_caixa.criado_por}</p>
					<Textarea placeholder="Anotar observacões..." id="message" class="h-36" />
				</div>
				<div class="border">
					<div class="col-auto">
						<!--itens do pedido - total - subtotal-->
						<h2 class="text-3xl font-bold">Itens do pedido:</h2>
						<ul class="text-lg">
							{#each pedidos_caixa.itens_pedido as item (item.id)}
								<li class="py-2">{item.nome} - R${item.preco}</li>
								<hr />
							{/each}
						</ul>
						<h2 class="flex justify-end text-3xl font-bold">
							Total:&nbsp;<span class="text-green-500">R${pedidos_caixa.valor_total}</span>
						</h2>
					</div>
				</div>
			</div>

			<!--Botão vincular cliente - mais opcoes -->
			<!-- <div>
				<Button class="w-full">Vincular a um cliente</Button>
			</div>
			<div class="w-full">
				<Button class="w-full">Mais opcoes</Button>
			</div> -->
			<div class="row-auto flex">
				<div class="col-auto border p-2">
					<!--cancelar-->
					<a href="/" class={buttonVariants({ variant: 'brenosubmit' })}>CANCELAR</a>
				</div>
				<div class="col-auto border p-2">
					<!--Imprimir - pagamento-->
					<Button variant="brenosubmit">IMPRIMIR</Button>
					<Button variant="brenosubmit">PAGAMENTO</Button>
					<ButtonCardapio label={'TESTE'} Icon={CirclePlus} />
				</div>
			</div>
		</div>
	</div>
</div>
