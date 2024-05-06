<script lang="ts">
	import {
		createTable,
		Render,
		Subscribe,
		createRender,
	} from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import type { PageData } from './$types';
	import ModalShowInfo from './ModalShowInfo.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import {
		addTableFilter,
		addPagination,
		addSortBy,
	} from 'svelte-headless-table/plugins';
	import Button from '$lib/components/ui/button/button.svelte';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';

	export let clientes: {
		celular: string;
		cpf_cnpj: string | null;
		created_at: string;
		data_nascimento: string | null;
		email: string | null;
		id: number;
		nome: string;
		rg_ie: string | null;
		telefone_fixo: string | null;
	}[];

	const data = readable(clientes);

	type Cliente = {
		id: number;
		nome: string;
		email: string | null;
		celular: string;
		cpf_cnpj: string | null;
		created_at: string;
		data_nascimento: string | null;
		rg_ie: string | null;
		telefone_fixo: string | null;
	};

	const mappedData: Cliente[] = clientes.map((cliente) => ({
		id: cliente.id,
		nome: cliente.nome,
		email: cliente.email,
		celular: cliente.celular,
		cpf_cnpj: cliente.cpf_cnpj,
		created_at: cliente.created_at,
		data_nascimento: cliente.data_nascimento,
		rg_ie: cliente.rg_ie,
		telefone_fixo: cliente.telefone_fixo,
	}));

	const table = createTable(data, {
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) =>
				value.toLowerCase().includes(filterValue.toLowerCase()),
		}),
	});

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
			accessor: 'nome',
			header: 'Nome',
			plugins: {
				sort: {
					disable: true,
				},
				filter: {
					exclude: false,
				},
			},
		}),
		table.column({
			accessor: 'email',
			header: 'Email',
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
			accessor: 'cpf_cnpj',
			header: 'CPF/CNPJ',
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
			accessor: 'rg_ie',
			header: 'RG/IE',
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
			accessor: ({
				id,
				nome,
				email,
				celular,
				cpf_cnpj,
				created_at,
				data_nascimento,
				rg_ie,
				telefone_fixo,
			}) => ({
				id,
				nome,
				email,
				celular,
				cpf_cnpj,
				created_at,
				data_nascimento,
				rg_ie,
				telefone_fixo,
			}),
			header: 'Detalhes do cliente',
			cell: ({ value }) => {
				return createRender(ModalShowInfo, {
					id: value.id,
					nome: value.nome,
					email: value.email,
					celular: value.celular,
					cpf_cnpj: value.cpf_cnpj,
					created_at: value.created_at,
					data_nascimento: value.data_nascimento,
					rg_ie: value.rg_ie,
					telefone_fixo: value.telefone_fixo,
				});
			},
		}),
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);
	const { filterValue } = pluginStates.filter;
</script>

<div class="flex items-center py-4">
	<Input
		class="max-w-sm"
		placeholder="Buscar clientes pelo nome..."
		type="text"
		bind:value={$filterValue}
	/>
</div>
<div class="rounded-md border">
	<Table.Root {...$tableAttrs}>
		<Table.Header class="bg-primary ">
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
								<Table.Head {...attrs}>
									<div class="text-primary-foreground">
										{#if cell.id === 'amount'}
											<div class="text-right">
												<Render of={cell.render()} />
											</div>
										{:else if cell.id === 'id'}
											<Button variant="ghost" on:click={props.sort.toggle}>
												<Render of={cell.render()} />
												<ArrowUpDown class={'ml-2 h-4 w-4'} />
											</Button>
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
					<Table.Row {...rowAttrs}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs}>
									{#if cell.id === 'amount'}
										<div class="text-right font-medium">
											<Render of={cell.render()} />
										</div>
									{:else if cell.id === 'status'}
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
