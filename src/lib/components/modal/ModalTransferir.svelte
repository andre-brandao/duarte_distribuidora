<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Send } from 'lucide-svelte';

	export let nome: string;
	export let quantidade: number;
</script>

<main class="flex items-center justify-center">
	<Dialog.Root>
		<Dialog.Trigger>Transferir estoque</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[500px]">
			<Dialog.Header>
				<Dialog.Title
					>Transferir <span class="font-bold text-primary">{nome}</span
					></Dialog.Title
				>
				<Dialog.Description>
					Selecione a quantidade e a unidade.
				</Dialog.Description>
			</Dialog.Header>
			<div class="mt-3 flex justify-between">
				<Label>Digite a quantidade à transferir:</Label>
				<Label>(Máximo: <span class="text-primary">{quantidade}</span>)</Label>
			</div>
			<Input
				type="number"
				placeholder="Máximo: {quantidade}"
				max={quantidade}
				min="1"
			></Input>
			<Label class="mt-3 text-left">Selecione a unidade:</Label>
			<select
				id="unidades"
				class="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
			>
				<option value="">Selecione...</option>
				<option value="unidade1">Unidade 1</option>
				<!--Dé não sei se ja tem unidade cadastrada no BD-->
			</select>
			<Dialog.Footer>
				{#if quantidade === 0}
					<div class="flex items-center gap-2">
						<p class="text-red-500">0 itens em estoque</p>
						<Button class="flex items-center" disabled>
							<p class="pr-2">Transferir</p>
							<Send />
						</Button>
					</div>
				{:else}
					<Button type="submit" class="flex items-center">
						<p class="pr-2">Transferir</p>
						<Send />
					</Button>
				{/if}
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</main>
