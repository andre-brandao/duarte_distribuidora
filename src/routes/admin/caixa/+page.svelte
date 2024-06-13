<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData

	let distribuidoras = data.distribuidoras
</script>

<main>
	<div class="mb-7 flex items-center justify-between gap-5">
		<h1 class="text-center text-4xl font-bold">Selecione o caixa</h1>
		<a
			href="/admin/caixa/transacoes"
			class="rounded-lg bg-primary p-2 px-4 transition ease-in-out hover:bg-opacity-80"
			>Ver transacões dos caixas</a
		>
	</div>
	<div class="grid grid-cols-2 justify-center gap-2">
		{#each distribuidoras as distribuidora}
			<div>
				<h1 class="min-w-48 rounded p-2 text-center text-xl">
					{distribuidora.nome}:
				</h1>
				<div class="flex flex-col gap-2 text-center">
					{#each distribuidora.caixa as caixa, i}
						<a
							href="/admin/caixa/{caixa.id}"
							class="rounded-lg bg-primary p-2 transition ease-in-out hover:bg-opacity-80"
							>Caixa {i + 1}</a
						>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</main>
<!-- <pre>
	{JSON.stringify(distribuidoras, null, 2)}
</pre> -->
