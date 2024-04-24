<script lang="ts">
	import ModalCliente from '$lib/components/modal/ModalCliente.svelte';
	import ButtonCliente from '$lib/components/buttons/ButtonCliente.svelte';
	import ButtonCardapio from '$lib/components/buttons/ButtonCardapio.svelte';
	import { onMount } from 'svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import ModalProduto from '$lib/components/modal/ModalProduto.svelte';
	import { Ban, Printer, DollarSign } from 'lucide-svelte';

	import type { PageData } from './$types.js';
	export let data: PageData;

	const { clientes, produtos } = data;

	const pedidos_caixa = {
		num_pedido: 0,
		datahora_pedido: '',
		isOpen: true,
		criado_por: 'BRENO',
		//itens_pedido: produtos,
		valor_total: 0
	};

	// pedidos_caixa.valor_total = pedidos_caixa.itens_pedido.reduce(
	// 	(total, item) => total + item.preco,
	// 	0
	// );

	// onMount(() => {
	// 	pedidos_caixa.datahora_pedido = new Date().toLocaleString('pt-BR', {
	// 		day: '2-digit',
	// 		month: '2-digit',
	// 		hour: '2-digit',
	// 		minute: '2-digit'
	// 	});
	// });
</script>

<div class="p-4 sm:ml-64">
	<div class="rounded-lg p-4">
		<div class="">
			<div class="gap-0 py-1">
				<div class="items-center gap-0 pb-7">
					<h1 class="text-center text-4xl font-bold">Pedido no caixa</h1>
				</div>
			</div>
			<div class="flex flex-col justify-center xl:flex-row">
				<div class="col-auto mr-6 flex h-auto flex-col justify-between">
					<div class="">
						<h2 class="text-3xl font-bold">Informações do pedido:</h2>
						<div
							class={`mt-5 w-96 rounded-lg px-3 py-1 text-center font-bold text-white  ${pedidos_caixa.isOpen ? 'success-bg' : 'bg-red-500'}`}
						>
							{pedidos_caixa.isOpen ? 'Em aberto' : 'Fechado'}
						</div>
						<div class="mt-4">
							<p>
								Número do pedido <span class="font-bold text-primary">
									#{pedidos_caixa.num_pedido}</span
								>
							</p>
							<p>Pedido iniciado {pedidos_caixa.datahora_pedido}</p>
							<p>
								Criado por: <span class="font-bold text-primary">{pedidos_caixa.criado_por}</span>
							</p>
						</div>
					</div>
					<div>
						<ModalCliente {clientes}/>
						<ButtonCardapio label={'CANCELAR'} Icon={Ban} href="/" />
					</div>
				</div>

				<div class="col-auto rounded-lg border-4 border-opacity-50 p-4">
					<ul class="mb-4 text-center text-lg">
						<!-- {#each pedidos_caixa.itens_pedido as item (item.id)}
							<li class="py-2 font-bold">{item.nome} - R${item.preco}</li>
							<hr />
						{/each} -->
					</ul>
					<h2 class="mx-10 flex justify-center text-3xl font-bold">
						Preco total:&nbsp;<span class="text-green-500">R${pedidos_caixa.valor_total}</span>
					</h2>
				</div>

				<div class="col-auto ml-6 flex h-auto flex-col justify-between">
					<div>
						<ModalProduto {produtos}/>
						<p class="mb-2 mt-6">Observações sobre compra:</p>
						<Textarea placeholder="Anotar observacões..." id="message" class="mb-5 h-36" />
					</div>
					<div>
						<div class="mb-4">
							<ButtonCardapio label={'IMPRIMIR'} Icon={Printer} />
						</div>
						<ButtonCardapio label={'PAGAMENTO'} Icon={DollarSign} />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.success-bg {
		background-color: #04cf00;
	}
</style>
