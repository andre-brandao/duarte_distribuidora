<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let distribuidoras = data.distribuidoras;
</script>

<main class="flex items-center justify-center gap-3">
	<div class="flex flex-col gap-0 py-1">
		<div class="items-center gap-0 pb-7">
			<h1 class="text-center text-4xl font-bold">Selecione o caixa</h1>
		</div>
		<div class="grid grid-cols-2 justify-center gap-2">
			{#each distribuidoras as distribuidora}
				<div>
					<h1 class="min-w-48 rounded p-2 text-center text-xl">
						{distribuidora.nome}:
					</h1>
					<div class="flex flex-col gap-2 text-center">
						{#each distribuidora.caixa as caixa}
							<a
								href="/admin/caixa/{caixa.id}"
								class="rounded-lg bg-primary p-2"
								>Caixa {caixa.id}</a
							>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>
<pre>
	{JSON.stringify(distribuidoras, null, 2)}
</pre>
