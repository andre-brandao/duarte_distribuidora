<script lang="ts">
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';

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
		<DropdownMenu.Item on:click={() => goto('/admin/estoque/detalhes/' + id)}
			>Ver detalhes</DropdownMenu.Item
		>
		<!-- <DropdownMenu.Item>View payment details</DropdownMenu.Item> -->
	</DropdownMenu.Content>
</DropdownMenu.Root>
