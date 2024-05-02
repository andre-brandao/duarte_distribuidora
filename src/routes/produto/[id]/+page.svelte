<script lang="ts">
	import CategoriaPicker from '$lib/components/CategoriaPicker.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import NumberInput from '$lib/components/ui/input/number_input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import PrecoInput from './PrecoInput.svelte';

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

	let idNovaCategoria = '';

	$: {
		addVariacao(idNovaCategoria);
	}

	async function addVariacao(idNovaCategoria: string) {
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

		const { data: var_prod_resp, error: err_var_prod_c } = await supabase
			.from('var_produto')
			.insert({
				produto_id: produto.id,
				categoria_id: Number(nova_categoria.value),
			})
			.select('id,categoria(id,nome),preco(*)')
			.single();

		if (err_var_prod_c) {
			console.error(err_var_prod_c);
			return;
		}

		var_produto = [...var_produto, var_prod_resp];
		novo_preco = {
			preco_in_cents: 0,
			tipo: '',
		};
	}

	let novo_preco = { tipo: '', preco_in_cents: 0 };
	async function addPreco(
		var_id: number,
		novo_preco: { tipo: string; preco_in_cents: number },
	) {
		if (!novo_preco.tipo || !novo_preco.preco_in_cents) {
			console.error('Tipo e Preco são obrigatórios');
			return;
		}
		// check if a preco of this tipo already existis

		if (
			var_produto.some((var_prod) =>
				var_prod.preco.some((preco) => preco.tipo === novo_preco.tipo),
			)
		) {
			console.error('Preco já existe');
			return;
		}

		const { data: preco_resp, error: err_preco } = await supabase
			.from('preco')
			.insert({
				var_produto_id: var_id,
				preco_in_cents: novo_preco.preco_in_cents,
				tipo: novo_preco.tipo,
			})
			.select('*')
			.single();

		if (err_preco) {
			console.error(err_preco);
			return;
		}
		var_produto = var_produto.map((var_prod) => {
			if (var_prod.id === var_id) {
				var_prod.preco = [...var_prod.preco, preco_resp];
				console.log('preco adicionado');
			}
			return var_prod;
		});
	}
</script>

<main class="flex items-center justify-center p-4 sm:ml-64">
	<div class="container flex flex-col items-center justify-center">
		<div
			class="mb-4 flex flex-col items-center justify-center gap-2 sm:flex-row"
		>
			<Label class="">Produto</Label>
			<Input
				class="rounded border border-gray-300 px-4 py-2 focus:outline-none"
				bind:value={produto.nome}
			/>
			<CategoriaPicker {supabase} {categorias} bind:value={idNovaCategoria} />
		</div>
		<div
			class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
		>
			{#each var_produto as variacao}
				<div class="flex flex-col justify-between rounded-lg border">
					<div class="flex flex-col items-center justify-center">
						<div class="h-40 w-full">
							<img
								src="/favicon.png"
								class="mb-2 h-full w-full object-cover"
								alt=""
							/>
						</div>
						<div class="w-full p-2">
							<CategoriaPicker
								{supabase}
								{categorias}
								value={variacao.categoria?.id.toString()}
							/>
						</div>
						<div>
							{#each variacao.preco as preco}
								<PrecoInput {preco} {supabase} />
							{/each}
						</div>
					</div>
					<!-- PARTE RESERVADA PARA O NOVO PRECO -->
					<div class="mt-3 bg-gray-100 p-2">
						<Label class="mr-2">Tipo Preco</Label>
						<Input
							class="rounded border border-gray-300 px-4 py-2 focus:outline-none"
							bind:value={novo_preco.tipo}
						/>
						<Label class="mr-2">Preco</Label>
						<NumberInput
							class="mb-2 border-gray-300 bg-white"
							bind:value={novo_preco.preco_in_cents}
						/>
						<Button
							variant="btnproduct"
							on:click={() => addPreco(variacao.id, novo_preco)}
						>
							Adicionar Preco
						</Button>
					</div>
				</div>
			{/each}
		</div>
		<!-- <div class="flex items-center justify-center">
			<CategoriaPicker {supabase} {categorias} bind:value={idNovaCategoria} />
		</div> -->
	</div>
</main>
