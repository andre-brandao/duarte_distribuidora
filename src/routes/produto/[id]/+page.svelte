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

	let var_produto = produto.var_produto;

	import CategoriaPicker from '$lib/components/CategoriaPicker.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import NumberInput from '$lib/components/ui/input/number_input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	let idNovaCategoria = '';

	$: {
		addVariacao(idNovaCategoria);
	}

	function addVariacao(idNovaCategoria: string) {
		const nova_categoria = categorias.find(
			(categoria) => categoria.value === idNovaCategoria,
		);

		if (!nova_categoria) {
			console.error('Categoria não encontrada');
			return;
		}

		// check if any variacao already has this categoria
		if (
			var_produto.some(
				(variacao) => variacao.categoria?.id === Number(nova_categoria.value),
			)
		) {
			console.error('Categoria já existe');
			return;
		}

		var_produto = [
			...var_produto,
			{
				id: null,
				categoria: {
					id: Number(nova_categoria.value),
					nome: nova_categoria.label,
				},
				preco: [],
			},
		];
	}
</script>

<main class="container flex items-center justify-center">
	<div>
		<div class="flex items-center justify-center">
			<Label>Produto</Label>
			<Input bind:value={produto.nome} />
		</div>
		<div class="flex gap-3 border border-red-300 p-1">
			{#each var_produto as variacao}
				<div
					class="flex h-[75vh] flex-col justify-between border border-primary p-1"
				>
					<div class="flex flex-col items-center justify-center">
						<div>
							<img src="/favicon.png" alt="" />
							<CategoriaPicker
								{supabase}
								{categorias}
								value={variacao.categoria?.id.toString()}
							/>
						</div>

						<div>
							{#each variacao.preco as preco}
								<div>
									<Label>{preco.tipo}</Label>
									<NumberInput bind:value={preco.preco_in_cents} />
								</div>
							{/each}
						</div>
					</div>
					<!-- PARTE RESERVADA PARA O NOVO PRECO -->
					<div class="bg-slate-200 p-1">
						<Label>Tipo Preco</Label>
						<Input />
						<Label>Preco</Label>
						<Input />
					</div>
				</div>
			{/each}
			<div class="flex items-center justify-center">
				<CategoriaPicker {supabase} {categorias} bind:value={idNovaCategoria} />
			</div>
		</div>
	</div>
</main>
