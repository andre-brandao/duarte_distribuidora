<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const estoque = data.estoque;
	const produto = {
		nome: estoque.var_produto?.produto?.nome,
		quantidade: estoque.quantidade,
	};
</script>

<main class="container flex flex-col items-center justify-center">
	<p>
		Produto: {produto.nome}
	</p>
	<p>Quantidade em estoque: {produto.quantidade}</p>
	{#each estoque.transacao_estoque as transacao_estoque}
		<div>
			<p>{transacao_estoque.quantidade}</p>
			<p>{JSON.stringify(transacao_estoque.meta_data, null, 2)}</p>
		</div>
	{/each}
</main>
