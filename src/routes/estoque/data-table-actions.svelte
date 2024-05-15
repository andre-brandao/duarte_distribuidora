<script lang="ts">
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import ModalTransferir from '$lib/components/modal/ModalTransferir.svelte';

	export let id: string;
	export let nome:string;
	export let quantidade:number;
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
			<DropdownMenu.Label>Opções</DropdownMenu.Label>
			<!-- <DropdownMenu.Item>Entrada Estoque</DropdownMenu.Item> -->
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item on:click={() => goto('/estoque/' + id)}
			>Ver detalhes</DropdownMenu.Item
		>
		<!-- <DropdownMenu.Item>View payment details</DropdownMenu.Item> -->
		<button
			class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50"
		>
			<ModalTransferir {nome} {quantidade}/>
		</button>
	</DropdownMenu.Content>
</DropdownMenu.Root>
