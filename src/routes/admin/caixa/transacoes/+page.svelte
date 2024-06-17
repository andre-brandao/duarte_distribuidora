<script lang="ts">
	import { formatM, formatDate } from '$lib/utils'
	import type { PageData } from './$types'
	import * as Table from '$lib/components/ui/table/index.js'
	import { ArrowLeft } from 'lucide-svelte'
	import DataTable from './data-table.svelte';

	export let data: PageData

	let transacao_caixa = data.transacao_caixa
	//MOSTRAR UMA TABELA POR CAIXA E POR DISTRIBUIDORA
</script>

<main>
	<div class="mb-7 flex items-center justify-between gap-5">
		<h1 class="text-center text-4xl font-bold">Transações do caixa</h1>
		<div class="flex flex-col gap-5">
			<a
				href="/admin/caixa"
				class="flex gap-2 rounded-lg border p-2 px-5 font-bold transition ease-in-out hover:underline"
				><ArrowLeft />Voltar</a
			>
			<!-- <div class="gap-2">
				<label for="filtro">Filtrar transacões:</label>
				<select
					name="filtro"
					id="filtro"
					class="rounded-lg border bg-white p-2"
				>
					<option value="all">Todas transacões</option>
				</select>
			</div> -->
		</div>
	</div>
	<!-- <Table.Root>
		<Table.Caption>Tabela transações do caixa!</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">ID</Table.Head>
				<Table.Head>Distribuidora</Table.Head>
				<Table.Head>Data da transação</Table.Head>
				<Table.Head class="text-right">Tipo transação</Table.Head>
				<Table.Head class="w-[150px] text-right">Valor da transação</Table.Head>
				<Table.Head class="w-[150px] text-right">Total no caixa</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each transacao_caixa as transacao}
				<Table.Row>
					<Table.Cell class="font-medium">{transacao.id}</Table.Cell>
					<Table.Cell
						>{transacao.caixa?.distribuidora?.nome ?? 'Não tem'}</Table.Cell
					>
					<Table.Cell>{formatDate(transacao.created_at)}</Table.Cell>
					<Table.Cell class="text-right"
						>{transacao.meta_data?.tipo ?? 'Sem tipo'}</Table.Cell
					>
					<Table.Cell class="text-right"
						>R${formatM(transacao.cents_transacao)}</Table.Cell
					>
					<Table.Cell class="text-right font-medium"
						>R${formatM(transacao.total_log) ?? '0.00'}</Table.Cell
					>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root> -->

	<DataTable data={transacao_caixa}/>
</main>

<pre>
    {JSON.stringify(transacao_caixa, null, 2)}
</pre>
