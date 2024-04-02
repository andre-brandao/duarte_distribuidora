<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { tick } from 'svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { CirclePlus } from 'lucide-svelte';

	type Status = {
		value: string;
		label: string;
	};

	export  let categorias: Status[] = [
		{
			value: 'longneck',
			label: 'Longneck'
		},
		{
			value: 'lada',
			label: 'Lata'
		},
		{
			value: '600ml',
			label: '600ml'
		},
		{
			value: 'emporio',
			label: 'Emporio'
		}
		//   {
		//     value: "canceled",
		//     label: "Canceled"
		//   }
	];

	let open = false;
	export let value = '';

	$: selectedStatus = categorias.find((s) => s.value === value) ?? null;

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<div class="flex w-full">
	<!-- <p class="text-sm text-muted-foreground">Status</p> -->
	<Popover.Root bind:open let:ids >
		<Popover.Trigger asChild let:builder class='w-full'>
			<Button builders={[builder]} variant="outline" class="w-full justify-start">
				{selectedStatus ? selectedStatus.label : '+ Set status'}
			</Button>
		</Popover.Trigger>
		<Popover.Content class="p-0" align="start" side="right">
			<Command.Root>
				<Command.Input placeholder="Search" />
				<Command.List>
					<Command.Empty>No results found.</Command.Empty>
					<Command.Group>
						{#each categorias as status}
							<Command.Item
								value={status.value}
								onSelect={(currentValue) => {
									value = currentValue;
									closeAndFocusTrigger(ids.trigger);
								}}
							>
								{status.label}
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.List>
				<form action="nova_categoria" class="flex gap-1 p-1">
					<Input placeholder="Nova Categoria" />
					<button class="rounded-full bg-blue-200 px-1">
						<CirclePlus />
					</button>
				</form>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
</div>
