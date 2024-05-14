<script lang="ts">
	import ModalCliente from '$lib/components/modal/ModalCliente.svelte';
	import ButtonCliente from '$lib/components/buttons/ButtonCliente.svelte';
	import ButtonCardapio from '$lib/components/buttons/ButtonCardapio.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { onMount } from 'svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import ModalProduto from '$lib/components/modal/ModalProduto.svelte';
	import { Ban, Printer, DollarSign, CircleX, X } from 'lucide-svelte';
	import { pedidoStore } from '$lib/stores/pedidoStore.js';

	import type { PageData } from './$types.js';
	export let data: PageData;

	const { clientes, produtos } = data;

	let { supabase } = data;
	$: ({ supabase } = data);

	let { session } = data;

	const pedidos_caixa = {
		num_pedido: 0,
		datahora_pedido: '',
		isOpen: true,
		criado_por: session?.user.email ?? 'Desconhecido',
		valor_total: 0,
	};

	let produtos_pedido: typeof produtos = [];

	let cliente_selecionado: any = null;

	async function realizarPedido() {
		// TODO: VALIDAR DADOS

		// inserir na tabela pedido
		const pedidoToInsert = {
			cliente_id: cliente_selecionado?.id ?? null,
			total_in_cents: pedidos_caixa.valor_total,
			tipo: 'caixa',
			meta_data: null,
		};

		const { data: result_pedido, error: err_pedido } = await supabase
			.from('pedido')
			.insert(pedidoToInsert)
			.select('*')
			.single();

		if (err_pedido) {
			console.log(err_pedido);
			console.error(err_pedido);
			return;
		}

		// inserir na tabela produto_pedido
		const produtosToInsert = produtos_pedido.map((p) => {
			return {
				var_produto_id: p.id,
				quantidade: 1, // e isso
				pedido_id: result_pedido?.id, // mudar isso
				unidade_em_cents: p.preco[0]?.preco_in_cents ?? 0,
				total_in_cents: 1000,
			};
		});

		const { error: err_pp } = await supabase
			.from('produto_pedido')
			.insert(produtosToInsert);
		//ERRO AQUI (MUDAR)
		if (err_pp) {
			console.log(err_pp);
			console.error(err_pp);
			return;
		}

		// TODO validar erros
	}

	async function removerPedido() {}
</script>

<div class="">
	<div class="">
		<div class="">
			<div class="gap-0 py-1">
				<div class="items-center gap-0 pb-7">
					<h1 class="text-center text-4xl font-bold">Pedido no caixa</h1>
				</div>
			</div>
			<div class="flex flex-col justify-center xl:flex-row">
				<div class="col-auto flex h-auto flex-col justify-between xl:mr-6">
					<div class="">
						<h2 class="text-3xl font-bold">Informações do pedido:</h2>
						<div
							class={`mt-5 w-full rounded-lg px-3 py-1 text-center font-bold text-white  ${pedidos_caixa.isOpen ? 'success-bg' : 'bg-red-500'}`}
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
								Criado por: <span class="font-bold text-primary"
									>{pedidos_caixa.criado_por}</span
								>
							</p>
						</div>
					</div>
					<div>
						{#if !cliente_selecionado}
							<ModalCliente
								{clientes}
								on:cliente_selecionado={(e) => {
									const c = e.detail.cliente;
									cliente_selecionado = c;
								}}
							/>
						{:else}
							<div class="mb-3 flex items-center justify-between text-center">
								<h1 class="rounded border-2 p-1 px-3">
									{cliente_selecionado.nome}
								</h1>
								<Button on:click={() => (cliente_selecionado = null)}>
									<span
										class="flex items-center justify-center gap-3 text-center"
										>Remover cliente <CircleX /></span
									>
								</Button>
							</div>
						{/if}
						<ButtonCardapio label={'CANCELAR'} Icon={Ban} href="/" />
					</div>
				</div>

				<div class="col-auto rounded-lg border-4 border-opacity-50 p-4 xl:my-3">
					<ul class="mb-4 text-center text-lg">
						{#each $pedidoStore as item}

							<div class="flex justify-center">
								<li class="py-2 font-bold">
									<!--Colocar quantidade-->
									({item.quantidade}x)
									{item.nome}
									
									<span class="text-green-500"
										>R${item.unidade_em_cents * item.quantidade}</span
									>
								</li>
								<button class="px-2" on:click={(e)=>pedidoStore.removeTodosItemPedido(item.var_produto_id)}><X /></button>
							</div>
							<hr />
						{/each}
					</ul>
					<h2 class="mx-10 flex justify-center text-3xl font-bold">
						Preco total:&nbsp;<span class="text-green-500"
							>R${pedidos_caixa.valor_total}</span
						>
					</h2>
				</div>

				<div class="col-auto flex h-auto flex-col justify-between xl:ml-6">
					<div>
						<ModalProduto
							{produtos}
							on:add_produtos={(e) => {
								const p = e.detail;
								produtos_pedido.push(p);
								produtos_pedido = produtos_pedido;
								// TODO CHANgE THIS
								pedidos_caixa.valor_total += p.preco[0]?.preco_in_cents;
							}}
						/>
						<p class="mb-2 mt-6">Observações sobre compra:</p>
						<Textarea
							placeholder="Anotar observacões..."
							id="message"
							class="mb-5 h-36"
						/>
					</div>
					<div>
						<div class="mb-4">
							<ButtonCardapio label={'IMPRIMIR'} Icon={Printer} />
						</div>
						<button on:click={realizarPedido}>
							<ButtonCardapio label={'PAGAMENTO'} Icon={DollarSign} />
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<pre>
		{JSON.stringify($pedidoStore, null, 2)}
	</pre>
</div>


<style>
	.success-bg {
		background-color: #04cf00;
	}
</style>
