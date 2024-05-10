<script lang="ts">
	import {
		createTable,
		Render,
		Subscribe,
		createRender,
	} from 'svelte-headless-table';
	import {
		addPagination,
		addSortBy,
		addTableFilter,
		addHiddenColumns,
		addSelectedRows,
	} from 'svelte-headless-table/plugins';

	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';

	import { Input } from '$lib/components/ui/input';
	import DataTableActions from './data-table-actions.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import DataTableCheckbox from './data-table-checkbox.svelte';

	type Estoque = {
		id: number;
		nome: string;
		quantidade: number;
		tipo: string;
	};

	export let data: Estoque[] = [];

	const table = createTable(readable(data), {
		filter: addTableFilter({
			fn: ({ filterValue, value }) =>
				value.toLowerCase().includes(filterValue.toLowerCase()),
		}),
		hide: addHiddenColumns(),
		select: addSelectedRows(),
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'nome',
			header: 'Nome',
		}),
		table.column({
			accessor: 'quantidade',
			header: 'Quantidade Em estoque',

			plugins: {
				filter: {
					exclude: true,
				},
			},
			// cell: ({ value }) =>
			// 	`<code class="${value > 0 ? 'bg-green-300' : 'bg-red-300'}"> ${value} </code>`
		}),
		table.column({
			accessor: 'tipo',
			header: 'Tipo',

			plugins: {
				filter: {
					exclude: true,
				},
			},
		}),

		table.column({
			accessor: ({ id, nome, quantidade }) => ({ id, nome, quantidade }),
			header: '',
			cell: ({ value }) => {
				return createRender(DataTableActions, {
					id: value.toString(),
					nome: value.nome,
					quantidade: value.quantidade,
				});
			},
		}),
	]);

	const {
		headerRows,
		pageRows,
		tableAttrs,
		tableBodyAttrs,
		pluginStates,
		flatColumns,
		rows,
	} = table.createViewModel(columns);
	const { filterValue } = pluginStates.filter;
	const { hiddenColumnIds } = pluginStates.hide;
	const { selectedDataIds } = pluginStates.select;

	const ids = flatColumns.map((col) => col.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));
	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);

	const hidableCols = ['id', 'quantidade', 'tipo'];
</script>

<div>
	<div class="flex items-center py-4">
		<Input
			class="max-w-sm"
			placeholder="Filter produtos..."
			type="text"
			bind:value={$filterValue}
		/>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button variant="outline" class="ml-auto" builders={[builder]}>
					Colunas <ChevronDown class="ml-2 h-4 w-4" />
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

	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header class="bg-primary ">
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
									<Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">
										<div class="text-primary-foreground">
											{#if cell.id == 'tipo'}
												<div class="text-right">
													<Render of={cell.render()} />
												</div>
											{:else}
												<Render of={cell.render()} />
											{/if}
										</div>
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
						<Table.Row
							{...rowAttrs}
							data-state={$selectedDataIds[row.id] && 'selected'}
						>
							{#each row.cells as cell (cell.id)}
								{@const value = cell.value}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										{#if cell.id === 'quantidade'}
											<code class="rounded-lg bg-gray-200 px-5 py-2">
												<Render of={cell.render()} />
											</code>
										{:else if cell.id === 'tipo'}
											<div class="text-right">
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
</div>
