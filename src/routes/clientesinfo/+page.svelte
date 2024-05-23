<script lang="ts">
	import type { PageData } from './$types';


	export let data: PageData;

	let clientes = data.clientes;
	let modalInfo: HTMLDialogElement;


</script>

<main class="mx-auto ">
	<div class="gap-0 py-1">
		<div class="items-center gap-0 pb-7">
			<h1 class="text-center text-4xl font-bold">Informações de clientes</h1>
		</div>
	</div>
	<!-- <pre>
		{JSON.stringify($page,null,2)}
	</pre> -->

	<div class="feed">
		{#each clientes as cliente}
			<a href="/clientesinfo/{cliente.id}" class="hover:underline">
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
