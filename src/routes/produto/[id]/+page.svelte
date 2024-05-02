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
								<PrecoInput {preco} {supabase} />
							{/each}
						</div>
					</div>
					<!-- PARTE RESERVADA PARA O NOVO PRECO -->
					<div class="bg-slate-200 p-1">
						<Label>Tipo Preco</Label>
						<Input bind:value={novo_preco.tipo} />
						<Label>Preco</Label>
						<NumberInput bind:value={novo_preco.preco_in_cents} />
						<Button on:click={() => addPreco(variacao.id, novo_preco)}>
							Adicionar Preco
						</Button>
					</div>
				</div>
			{/each}
			<div class="flex items-center justify-center">
				<CategoriaPicker {supabase} {categorias} bind:value={idNovaCategoria} />
			</div>
		</div>
	</div>
</main>
