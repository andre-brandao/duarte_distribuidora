<script lang="ts">
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import ModalShowInfo from './ModalShowInfo.svelte';

	export let celular: string;
	export let cpf_cnpj: string | null;
	export let created_at: string;
	export let data_nascimento: string | null;
	export let email: string | null;
	export let id: number;
	export let nome: string;
	export let rg_ie: string | null;
	export let telefone_fixo: string | null;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			variant="ghost"
			builders={[builder]}
			size="icon"
			class="relative h-8 w-8 p-0"
		>
			<span class="sr-only">Open menu</span>
			<Ellipsis class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<!-- <DropdownMenu.Label>Opções</DropdownMenu.Label>
			<DropdownMenu.Item>Alterar informacoes</DropdownMenu.Item> -->
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>Ver detalhes</DropdownMenu.Item>
		<!-- <DropdownMenu.Item>View payment details</DropdownMenu.Item> -->
		<button
			class="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50"
			><ModalShowInfo
				{id}
				{nome}
				{email}
				{celular}
				{cpf_cnpj}
				{created_at}
				{data_nascimento}
				{rg_ie}
				{telefone_fixo}
			/>
		</button>
	</DropdownMenu.Content>
</DropdownMenu.Root>
