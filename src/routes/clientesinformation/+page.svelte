<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let clientes = data.clientes;
	let pedido = data.pedido;
	let produto_pedido = data.produto_pedido;
</script>

{#each clientes as item}
	<div class="mt-3 text-center text-lg">
		<hr />
		<p>
			<strong>ID:</strong>
			{item.id} - <strong>Nome:</strong>
			{item.nome || 'Não informada'}
		</p>
		<hr />
		<p>
			<strong>CPF/CNPJ:</strong>
			{item.cpf_cnpj || 'Não informada'} - <strong>RG/IE:</strong>
			{item.rg_ie || 'Não informado'}
		</p>
		<hr />
		<p><strong>E-mail:</strong> {item.email || 'Não informado'}</p>
		<hr />
		<p>
			<strong>Celular:</strong>
			{item.celular || 'Não informada'} - <strong>Fixo:</strong>
			{item.telefone_fixo || 'Não informado'}
		</p>
		<hr />
		<p>
			<strong>Data de Nascimento:</strong>
			{item.data_nascimento || 'Não informada'}
		</p>
		<hr />
		<p><strong>Data de Criação:</strong> {item.created_at}</p>
	</div>
{/each}

{#each pedido as item}
	<div class="ml-100 mt-3 text-center text-lg">
		<h1>{item.total_in_cents}</h1>
		<h1>{item.tipo}</h1>
		<h1>{item.id}</h1>
		<h1>{item.cliente_id}</h1>
	</div>
{/each}

{#each produto_pedido as item}
	<div class="ml-100 mt-3 text-center text-lg">
		<h1>{item.total_in_cents}</h1>
		<h1>{item.quantidade}</h1>
		<h1>{item.var_produto_id}</h1>
		<h1>{item.unidade_in_cents}</h1>
	</div>
{/each}
