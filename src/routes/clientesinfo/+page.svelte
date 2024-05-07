<script lang="ts">
	import type { PageData } from './$types';
	import DataTable from './data-table.svelte';
	import { goto, preloadData, pushState } from '$app/navigation';
	import { page } from '$app/stores';
	import ModalInfo from './ModalInfo.svelte';
	import Clientes from './[id]/+page.svelte';

	export let data: PageData;

	let clientes = data.clientes;
	let modalInfo: HTMLDialogElement;

	$: console.log($page.state.modalCliente);
	let isso: any = null;

	async function showModal(e: MouseEvent) {
		const { href } = e.currentTarget as HTMLAnchorElement;

		const result = await preloadData(href);
		console.log(result);

		if (result.type === 'loaded' && result.status === 200) {
			console.log("carregado com sucesso");
			pushState(href, { modalCliente: result.data.Clientes });
			modalInfo.showModal();
		} else {
			goto(href);
		}
	}

	function closeModal() {
		history.back();
	}
</script>

<main class="mx-auto p-4 sm:ml-64">
	<div class="gap-0 py-1">
		<div class="items-center gap-0 pb-7">
			<h1 class="text-center text-4xl font-bold">Informações de clientes</h1>
		</div>
	</div>
	<!-- <pre>
		{JSON.stringify($page,null,2)}
	</pre> -->
	<ModalInfo bind:modalInfo on:close={closeModal}>
		{#if $page.state.modalCliente}
			<Clientes data={$page.state.modalCliente} />
		{/if}
	</ModalInfo>
	<div class="feed">
		{#each clientes as cliente}
			<a on:click|preventDefault={showModal} href="/clientesinfo/{cliente.id}">
				<h1>{cliente.nome}</h1>
			</a>
		{/each}
	</div>
	<!-- {#if clientes}
		<div class="flex justify-center">
			<div class="overflow-x-auto">
				<DataTable {clientes} />
			</div>
		</div>
	{:else}
		<p>Nenhum cliente encontrado!</p>
	{/if} -->
</main>

<style>
	.feed {
		max-inline-size: 600px;
		display: grid;
		gap: 2rem;
		margin-inline: auto;
		padding-block: 2rem;
	}
</style>
