<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { tick } from 'svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { CirclePlus } from 'lucide-svelte';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { Database } from '$lib/supabase-types';
	import { toast } from 'svelte-sonner';

	type Status = {
		value: string;
		label: string;
	};

	export let categorias: Status[] = [];

	let open = false;
	export let value = '';

	export let supabase: SupabaseClient<Database>;

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

	let nomeNovaCategoria = '';
	async function createNewCategoria() {
		const { data, error } = await supabase
			.from('categoria')
			.insert({
				nome: nomeNovaCategoria,
			})
			.select('*').single();
		console.log('nova categoria');

		if (error ){
			toast.error(error.message)
			return
		}
		toast.success('Categoria adicionada com sucesso!')

		categorias.push({
			label: data.nome,
			value: data.id.toString()
		})
		categorias = categorias
	}
</script>

<div class="flex">
	<!-- <p class="text-sm text-muted-foreground">Status</p> -->
	<Popover.Root bind:open let:ids>
		<Popover.Trigger asChild let:builder class="w-full">
			<Button builders={[builder]} variant="outline" class="w-full text-center">
				{'+ Adicionar nova categoria'}
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
				<div
					
					class="flex items-center justify-center gap-1 p-1"
				>
					<Input placeholder="Nova Categoria" bind:value={nomeNovaCategoria} />
					<button
						class="rounded-full bg-transparent p-2"
						on:click={createNewCategoria}
					>
						<CirclePlus />
					</button>
				</div>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
</div>
