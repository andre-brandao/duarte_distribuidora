<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let { supabase } = data;
	$: ({ supabase } = data);

	const produtos = data.produtos;
	let nomeNovoProduto = '';
	async function createNovoProduto() {
		if (nomeNovoProduto.length < 3) {
			alert('Nome do produto deve ter no mínimo 3 caracteres');
			return;
		}

		const { data: produto, error } = await supabase
			.from('produto')
			.insert({ nome: nomeNovoProduto })
			.select('*')
			.single();

		if (error) {
			console.error(error);
			return;
		}
		goto(`/produto/${produto.id}`);
	}
</script>

<main class="container">
	<div class="flex flex-col items-center justify-center gap-3">
		{#each produtos as produto}
			<a class="hover:underline" href="/produto/{produto.id}">{produto.nome}</a>
		{/each}
		<div class="flex">
			<Input placeholder="Nome Novo Produto" bind:value={nomeNovoProduto} />
			<Button on:click={createNovoProduto}>Adicionar Produto</Button>
		</div>
	</div>
</main>
