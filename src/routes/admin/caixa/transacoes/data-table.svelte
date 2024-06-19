<script lang="ts">
	import {
		createTable,
		Render,
		Subscribe,
		createRender,
	} from 'svelte-headless-table'
	import DataTableActions from './data-table-actions.svelte'
	import { readable, writable, derived } from 'svelte/store'
	import * as Table from '$lib/components/ui/table'
	import type { Json } from '$lib/supabase-types'
	import {
		addPagination,
		addSortBy,
		addTableFilter,
		addHiddenColumns,
	} from 'svelte-headless-table/plugins'
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down'
	import ChevronDown from 'lucide-svelte/icons/chevron-down'
	import { Button } from '$lib/components/ui/button'
	import { Input } from '$lib/components/ui/input'
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu'
	import { formatDate, formatDateHora, formatM } from '$lib/utils'

	export let data: Transacao[]

	type Transacao = {
		caixa_id: number
		cents_transacao: number
		created_at: string
		id: number
		meta_data: Json
		total_log: number | null
		caixa: {
			cents_em_caixa: number
			created_at: string
			distribuidora_id: number
			id: number
			status: string
			distribuidora: {
				id: number
				nome: string
			} | null
		} | null
	}

	let selectedCaixaId = writable<number | null>(null)

	let uniqueCaixas = Array.from(
		new Map(
			data.map((transacao) => [transacao.caixa_id, transacao.caixa]),
		).values(),
	)

	let filteredData = derived(
		[readable(data), selectedCaixaId],
		([$data, $selectedCaixaId]) => {
			if ($selectedCaixaId === null) return $data
			return $data.filter(
				(transacao) => transacao.caixa_id === $selectedCaixaId,
			)
		},
	)

	const table = createTable(filteredData, {
		page: addPagination(),
		sort: addSortBy({
			initialSortKeys: [
				{
					id: 'created_at',
					order: 'desc',
				},
			],
		}),
		filter: addTableFilter({
			fn: ({ filterValue, value }) =>
				value.toLowerCase().includes(filterValue.toLowerCase()),
		}),
		hide: addHiddenColumns(),
	})

	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: 'ID',
			plugins: {
				sort: {
					disable: false,
				},
				filter: {
					exclude: true,
				},
			},
		}),
		table.column({
			accessor: 'created_at',
			header: 'Criado em',
			cell: ({ value }) => {
				const formatted = formatDateHora(value)
				return formatted
			},
			plugins: {
				sort: {
					disable: false,
				},
				filter: {
					exclude: false,
				},
			},
		}),
		table.column({
			accessor: 'caixa',
			header: 'Caixa',
			id: 'id_caixa',
			cell: ({ value }) => {
				const caixa_id = value?.id ? value?.id : ''
				return caixa_id
			},
			plugins: {
				sort: {
					disable: false,
				},
				filter: {
					exclude: true,
				},
			},
		}),
		table.column({
			accessor: 'caixa',
			header: 'Distribuidora',
			id: 'distribuidora_nome',
			cell: ({ value }) => {
				const caixa = value?.distribuidora?.nome
					? value?.distribuidora.nome
					: 'Sem distribuidora'
				return caixa
			},
			plugins: {
				sort: {
					disable: true,
				},
			},
		}),
		table.column({
			accessor: 'meta_data',
			header: 'Tipo',
			cell: ({ value }) => {
				const tipo = value?.tipo ? value?.tipo : 'Sem tipo'
				return tipo
			},
			plugins: {
				sort: {
					disable: true,
				},
				filter: {
					exclude: true,
				},
			},
		}),
		table.column({
			accessor: 'cents_transacao',
			header: 'Valor da transação',
			cell: ({ value }) => {
				const formatted = formatM(value)
				return formatted
			},
			plugins: {
				sort: {
					disable: true,
				},
				filter: {
					exclude: true,
				},
			},
		}),
		table.column({
			accessor: 'total_log',
			header: 'Total no caixa',
			cell: ({ value }) => {
				const formatted = formatM(value)
				return formatted
			},
			plugins: {
				sort: {
					disable: true,
				},
				filter: {
					exclude: true,
				},
			},
		}),
		// table.column({
		// 	accessor: ({ id }) => id,
		// 	header: '',
		// 	cell: ({ value }) => {
		// 		return createRender(DataTableActions, { id: value })
		// 	},
		// }),
	])

	const {
		headerRows,
		pageRows,
		tableAttrs,
		tableBodyAttrs,
		pluginStates,
		flatColumns,
	} = table.createViewModel(columns)

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page
	const { filterValue } = pluginStates.filter
	const { hiddenColumnIds } = pluginStates.hide

	const ids = flatColumns.map((col) => col.id)
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]))

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id)

	const hidableCols = ['id', 'cents_transacao', 'meta_data', 'total_log']
</script>

<div>
	<div class="flex items-center justify-between gap-5 py-4">
		<!-- <Input
			class="max-w-sm"
			placeholder="Filtrar por filial..."
			type="text"
			bind:value={$filterValue}
		/> -->
		<div class="flex gap-2">
			<select
				class="z-50 min-w-[8rem] rounded-md border bg-popover p-1 px-3 text-popover-foreground shadow-md focus:outline-none"
				on:change={(e) => {
					if (e.target && e.target instanceof HTMLSelectElement) {
						selectedCaixaId.set(
							e.target.value ? parseInt(e.target.value) : null,
						)
					}
				}}
			>
				<option
					class="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50"
					value="">Todos os caixas</option
				>
				<hr />
				{#each uniqueCaixas as caixa}
					<option
						class="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50"
						value={caixa?.id}
					>
						Caixa {caixa?.id} - {caixa?.distribuidora?.nome}
					</option>
				{/each}
			</select>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button variant="outline" class="ml-auto" builders={[builder]}>
						Visibilidade colunas <ChevronDown class="ml-2 h-4 w-4" />
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					{#each flatColumns as col}
						{#if hidableCols.includes(col.id)}
							<DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
								{col.header}
							</DropdownMenu.CheckboxItem>
						{/if}
					{/each}
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header class="bg-primary">
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe
									attrs={cell.attrs()}
									let:attrs
									props={cell.props()}
									let:props
								>
									<Table.Head {...attrs} class="text-primary-foreground">
										{#if cell.id === 'created_at'}
											<div class="text-left">
												<Button variant="ghost" on:click={props.sort.toggle}>
													<Render of={cell.render()} />
													<ArrowUpDown class={'ml-2 h-4 w-4'} />
												</Button>
											</div>
										{:else if cell.id === 'total_log'}
											<div class="text-right">
												<Render of={cell.render()} />
											</div>
										{:else if cell.id === 'cents_transacao'}
											<div class="text-right font-medium">
												<Render of={cell.render()} />
											</div>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										{#if cell.id === 'created_at'}
											<div class="text-left font-medium">
												<Render of={cell.render()} />
											</div>
										{:else if cell.id === 'total_log'}
											<div class="text-right">
												R$<Render of={cell.render()} />
											</div>
										{:else if cell.id === 'cents_transacao'}
											<div class="text-right">
												R$<Render of={cell.render()} />
											</div>
										{:else if cell.id === 'id'}
											<div class="capitalize">
												<Render of={cell.render()} />
											</div>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-end space-x-4 py-4">
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Página anterior</Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Próxima pagina</Button
		>
	</div>
</div>
