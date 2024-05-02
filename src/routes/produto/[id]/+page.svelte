<script lang="ts">
	import type { PageData } from './$types.js';
	export let data: PageData;

	let { supabase } = data;
	$: ({ supabase } = data);

	const categorias = data.categorias.map((categoria) => ({
		value: categoria.id.toString(),
		label: categoria.nome,
	}));

	const produto = data.produto;

	const var_produto = produto.var_produto;

	import CategoriaPicker from '$lib/components/CategoriaPicker.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import NumberInput from '$lib/components/ui/input/number_input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	let form = {
		produto_base: 'Heineken',
		preco_custo: 5.99,

		variacoes: [
			{
				nome: 'Longneck',
				precos: [
					{
						tipo: 'atacado',
						preco: 3.5,
					},
					{
						tipo: 'varejo',
						preco: 5.0,
					},
				],
			},
			{
				nome: 'Lata',
				precos: [
					{
						tipo: 'atacado',
						preco: 2.5,
					},
					{
						tipo: 'varejo',
						preco: 4.0,
					},
				],
			},
			{
				nome: '600ml',
				precos: [
					{
						tipo: 'atacado',
						preco: 4.5,
					},
					{
						tipo: 'varejo',
						preco: 6.0,
					},
				],
			},
			{
				nome: 'Emporio',
				precos: [
					{
						tipo: 'atacado',
						preco: 5.5,
					},
					{
						tipo: 'varejo',
						preco: 7.0,
					},
				],
			},
		],
	};
</script>

<main class="container flex items-center justify-center">
	<div>
		<div class="flex items-center justify-center">
			<Label>Produto</Label>
			<Input bind:value={produto.nome} />
		</div>
		<div class="grid grid-cols-4 border border-red-300 p-1">
			{#each var_produto as variacao}
				<div class="border border-primary p-1">
					<img src="/favicon.png" alt="" />
					<CategoriaPicker
						{supabase}
						{categorias}
						value={variacao.categoria?.id.toString()}
					/>
					{#each variacao.preco as preco}
						<div>
							<Label>{preco.tipo}</Label>
							<NumberInput bind:value={preco.preco_in_cents} />
						</div>
					{/each}
					<!-- PARTE RESERVADA PARA O NOVO PRECO -->
					<div>
						<Label>Novo Preco</Label>
						<Input />
					</div>
				</div>
			{/each}
			<div class="flex items-center justify-center">
				<CategoriaPicker {supabase} {categorias} value="" />
			</div>
		</div>
	</div>
</main>
