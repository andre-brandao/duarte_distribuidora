<script lang="ts">
	let logo ='202403131209_krxb_i.jpg';
</script>

<main class="container flex items-center h-screen justify-center">
	<!-- <div class="flex flex-col">
		<a href="/produtos" class="rounded-lg bg-red-300 p-3 hover:bg-primary"> BETA produtos </a>
		{#each clientes ?? [] as client}
			<a href="/cliente/{client.id}" class="hover:underline"> {client.nome}</a>
		{/each}	
	</div>
	<div class="flex flex-col">
		<a href="/cliente" class="rounded-lg bg-blue-300 p-3 hover:bg-primary"> BETA cliente </a>
		{#each produtos ?? [] as prod}
			<a href="/produtos/{prod.id}" class="hover:underline">{prod.nome}</a>
		{/each}
	</div>
	<div>
		<a href="/estoque" class="rounded-lg bg-green-300 p-3 hover:bg-primary"> BETA estoque </a>
	</div>
	<div>
		<a href="/pedidoscaixa" class={buttonVariants({ variant: 'brenovar' })}>Pedidos no caixa</a>
	</div> -->
	<div class=" w-1/3">
		<img src="{logo}" alt="LOGO">
	</div>
</main>
