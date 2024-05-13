<script lang="ts">
	import { intersect } from '$lib/utils';
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import ModalPedido from '$lib/components/modal/ModalPedido.svelte';
	export let data: PageData;

	const { categorias } = data;

	let search = '';
	let categoria_selecionada: string = '';
	let preventMudarCategoria = false;

	function scrollIntoView(event: {
		preventDefault: () => void;
		currentTarget: HTMLAnchorElement;
	}) {
		preventMudarCategoria = true;
		event.preventDefault();
		const link = event.currentTarget;
		const anchorId = new URL(link.href).hash.replace('#', '');
		const anchor = document.getElementById(anchorId);
		anchor?.scrollIntoView({ behavior: 'smooth' });

		console.log(anchor);

		setTimeout(() => {
			preventMudarCategoria = false;
			changeCategoriaSelecionada(anchorId);
		}, 1000);
	}
	let scrollContainer: HTMLDivElement;
	function changeCategoriaSelecionada(nova_categoria: string) {
		if (preventMudarCategoria) {
			return;
		}

		categoria_selecionada = nova_categoria;

		// scroll into view
		const anchor = document.getElementById(`cat-${nova_categoria}`);
		console.log(anchor);
		if (anchor && scrollContainer) {
			// calculate the position to scroll to
			const scrollPosition =
				anchor.offsetLeft -
				scrollContainer.clientWidth / 2 +
				anchor.clientWidth / 2;

			// scroll to the position smoothly
			scrollContainer.scrollTo({
				left: scrollPosition,
				behavior: 'smooth',
			});
		}
	}
</script>

<div class="p-4 sm:ml-64">
	<div class="">
		<div class="mb-5 mt-5 flex flex-col sm:flex-row justify-between">
			<div class="items-center gap-0">
				<h1 class="text-center text-4xl font-bold">Cardapio</h1>
			</div>
			<div class="flex justify-center gap-2 sm:mt-0 mt-4">
				<Input
					placeholder="Pesquisar produto..."
					class="col-span-2 md:h-auto h-10  py-1 w-full"
					bind:value={search}
				/>
			</div>
		</div>
		

		<div class="sticky top-2 z-10 bg-primary border rounded-lg">
			<div
				bind:this={scrollContainer}
				class=" flex flex-row gap-1 overflow-auto p-2"
			>
				<div class="flex flex-row items-center gap-2">
					{#each categorias ?? [] as categoria}
						<a
							href="#{categoria.id.toString()}"
							id="cat-{categoria.id.toString()}"
							on:click={scrollIntoView}
							class="rounded-md px-3 py-2 transition duration-200 hover:bg-yellow-300"
						>
							<div>
								{categoria.nome}
							</div>
						</a>
					{/each}
				</div>
			</div>
		</div>

		<div class="">
			{#each categorias as categoria}
				<div class="flex flex-col">
					<div
						id={categoria.id.toString()}
						class="py-5 text-center text-[25px] font-bold"
						use:intersect={{
							root: document.documentElement,
							rootMargin: '0px 0px 0px 0px',
						}}
						on:aa_enter={() => {
							changeCategoriaSelecionada(categoria.id.toString());
						}}
					>
						{categoria.nome}
					</div>
					<div
						class="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-2"
					>
						{#each categoria.var_produto as prod (prod.id)}
							<ModalPedido
								nome={prod.produto?.nome ?? 'Sem nome'}
								preco={prod.preco?.[0]?.preco_in_cents}
								categoria={categoria.nome}
								img={prod.img_url ?? ''}
							/>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
