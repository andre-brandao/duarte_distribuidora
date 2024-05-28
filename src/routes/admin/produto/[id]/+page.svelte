<script lang="ts">
	import CategoriaPicker from '$lib/components/CategoriaPicker.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import NumberInput from '$lib/components/ui/input/number_input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import PrecoInput from './PrecoInput.svelte';
	import { toast } from 'svelte-sonner';
	import { mask } from '$lib/utils';

	import type { PageData } from './$types.js';
	import { type FormInputEvent } from '$lib/components/ui/input';
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
		if (idNovaCategoria) {
			addVariacao(idNovaCategoria);
		}
	}

	async function addVariacao(idNovaCategoria: string) {
		const nova_categoria = categorias.find(
			(categoria) => categoria.value === idNovaCategoria,
		);

		if (!nova_categoria) {
			toast.error('Categoria não encontrada');
			console.error('Categoria não encontrada');
			return;
		}

		// check if any variacao already has this categoria
		if (
			var_produto.some(
				(variacao) => variacao.categoria?.id === Number(nova_categoria.value),
			)
		) {
			toast.error('Categoria já existe');
			console.error('Categoria já existe');
			return;
		}

		const { data: var_prod_resp, error: err_var_prod_c } = await supabase
			.from('var_produto')
			.insert({
				produto_id: produto.id,
				categoria_id: Number(nova_categoria.value),
			})
			.select('id,img_url,categoria(id,nome),preco(*),produto(nome)')
			.single();

		if (err_var_prod_c) {
			toast.error(err_var_prod_c.message);
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
			toast.error('Tipo e Preco são obrigatórios');
			console.error('Tipo e Preco são obrigatórios');
			return;
		}

		const { data: preco_resp, error: err_preco } = await supabase
			.from('preco')
			.insert({
				var_produto_id: var_id,
				preco_in_cents: Number(novo_preco.preco_in_cents) * 100,
				tipo: novo_preco.tipo,
			})
			.select('*')
			.single();

		if (err_preco) {
			toast.error(err_preco.message);
			console.error(err_preco);
			return;
		}
		var_produto = var_produto.map((var_prod) => {
			if (var_prod.id === var_id) {
				var_prod.preco = [...var_prod.preco, preco_resp];
				toast.success('Preco adicionado');
				console.log('preco adicionado');
			}
			return var_prod;
		});
	}

	async function updateProdutctPicture(
		e: FormInputEvent<Event>,
		prod: {
			id: number;
			nome: string;
		},
	) {
		// @ts-ignore
		const file = e.target?.files[0];
		console.log(file);
		if (!file) {
			toast.error('Selecione uma imagem');
			return;
		}
		const { error: err_img } = await supabase.storage
			.from('produto_imgs')
			.upload(prod.id.toString(), file);

		if (err_img) {
			toast.error(err_img.message);
			console.error(err_img);
			return;
		}
		const {
			data: { publicUrl },
		} = supabase.storage.from('produto_imgs').getPublicUrl(prod.id.toString());

		const { data: new_prod, error: erro_var_prod } = await supabase
			.from('var_produto')
			.update({ img_url: publicUrl })
			.eq('id', prod.id)
			.single();

		if (erro_var_prod) {
			toast.error(erro_var_prod.message);
			console.error(erro_var_prod);
			return;
		}

		var_produto = var_produto.map((var_prod) => {
			if (var_prod.id === prod.id) {
				var_prod.img_url = publicUrl;
			}
			return var_prod;
		});

		toast.success('Imagem adicionada');
	}
</script>

<main class="flex items-center justify-center">
	<div class="flex flex-col items-center justify-center p-2">
		<div class="mb-4 flex items-center justify-between gap-2 w-full bg-gray-100 p-3 rounded-lg">
			<div class="flex items-center gap-2">
				<Label class="">Produto</Label>
				<Input
					class="rounded border border-gray-300 px-4 py-2 focus:outline-none"
					bind:value={produto.nome}
				/>
			</div>
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
								src={variacao.img_url ?? '/favicon.png'}
								class="mb-2 h-full w-full rounded-t-lg object-cover"
								alt=""
							/>
						</div>
						<Input
							type="file"
							on:change={(e) =>
								updateProdutctPicture(e, {
									id: variacao.id,
									nome: `${variacao.categoria?.nome}_${variacao.produto?.nome}`,
								})}
						/>
						<div class="w-full p-2">
							<p class="text-center font-bold underline">
								{variacao.categoria?.nome} - {variacao.produto?.nome}
							</p>
						</div>
						<div class="p-2">
							{#each variacao.preco as preco}
								<PrecoInput {preco} {supabase} />
							{/each}
						</div>
					</div>
					<!-- PARTE RESERVADA PARA O NOVO PRECO -->
					<div class="mt-3 flex flex-col bg-gray-100 p-2">
						<Label class="mb-1">Tipo Preco</Label>
						<select
							class="mb-2 rounded border border-gray-300 bg-white px-4 py-2 focus:outline-none"
							bind:value={novo_preco.tipo}
						>
							<option value="Atacado 10un">Atacado 10un</option>
							<option value="Atacado 1un">Atacado 1un</option>
							<option value="Atacado 1caixa">Atacado 1caixa</option>
							<option value="Varejo">Varejo</option>
						</select>
						<Label class="mb-1 mr-2">Preco</Label>
						<input
							class=" mb-2 flex h-9 w-full rounded-md border border-gray-300 bg-transparent bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							type="number"
							use:mask={{
								mask: 'money',
							}}
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
