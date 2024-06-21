<script lang="ts">
	import { toast } from 'svelte-sonner'
	import type { PageData } from './$types'

	export let data: PageData

	let { supabase } = data
	$: ({ supabase } = data)

	let distribuidoras = data.distribuidoras

	async function adicionarNovoCaixa(distribuidoraId: number) {
		const { data, error } = await supabase
			.from('caixa')
			.insert([{ distribuidora_id: distribuidoraId }])
			.select()

		if (error) {
			toast.error(error.message)
			return
		}

		toast.success('Caixa adicionado com sucesso!')
		distribuidoras = distribuidoras.map((distribuidora) => {
			if (distribuidora.id === distribuidoraId) {
				return {
					...distribuidora, caixa: [...distribuidora.caixa, ...data],
				}
			}
			return distribuidora
		})
	}
</script>

<main>
	<div
		class="mb-7 flex flex-col items-center justify-between gap-5 lg:flex-row"
	>
		<h1 class="text-center text-4xl font-bold">Selecione o caixa</h1>
		<a
			href="/admin/caixa/transacoes"
			class="rounded-lg bg-primary p-2 px-4 transition ease-in-out hover:bg-opacity-80"
			>Ver transacões dos caixas</a
		>
	</div>
	<div class="grid grid-cols-1 justify-center gap-2 lg:grid-cols-2">
		{#each distribuidoras as distribuidora}
			<div class="flex flex-col gap-3">
				<h1 class="min-w-48 rounded p-2 text-center text-xl">
					{distribuidora.nome}:
				</h1>
				<button
					class="text center mx-auto max-w-fit rounded-lg bg-primary p-2 px-4 transition ease-in-out hover:bg-opacity-80"
					on:click={() => adicionarNovoCaixa(distribuidora.id)}
					>Adicionar um novo caixa</button
				>
				<div class="flex flex-col gap-2 text-center">
					{#each distribuidora.caixa as caixa}
						<a
							href="/admin/caixa/{caixa.id}"
							class="rounded-lg bg-primary p-2 transition ease-in-out hover:bg-opacity-80"
							>Caixa {caixa.id}</a
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
