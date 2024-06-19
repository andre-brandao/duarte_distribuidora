<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { Plus } from 'lucide-svelte';

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
		goto(`/admin/produto/${produto.id}`);
	}
</script>

<main class="">
	<div class="gap-0 py-1">
		<div class="flex mb-2 justify-between mx-10">
			<div class="items-center gap-0">
				<h1 class="text-center text-4xl font-bold">Produtos</h1>
			</div>
			<div class="flex justify-center gap-2">
				<Input placeholder="Novo produto..." class="col-span-2 h-auto w-auto py-1" bind:value={nomeNovoProduto} />
				<Button class="gap-2 w-auto h-auto" on:click={createNovoProduto}>Adicionar produto <Plus /></Button>
			</div>
		</div>
		<div class="container mx-auto p-4">
			<div class="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">
				{#each produtos as produto}
					<a
						class="rounded-lg bg-gray-300 bg-opacity-85 p-6 text-center font-bold transition ease-in-out hover:bg-gray-200"
						href="/admin/produto/{produto.id}"
					>
						<span>{produto.nome}</span>
					</a>
				{/each}
			</div>
		</div>
	</div>
</main>
