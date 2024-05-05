<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Plus, Minus } from 'lucide-svelte';

</script>

<main class="flex items-center justify-center">
	<Dialog.Root>
		<Dialog.Trigger>
			Transferir estoque
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[600px]">
			<Dialog.Header>
				<Dialog.Title
					>Adicionar <span class="font-bold text-primary"></span> ao seu pedido</Dialog.Title
				>
				<Dialog.Description>
					Selecione a quantidade e clique em adicionar!
				</Dialog.Description>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				<div class=" h-10 w-10 items-center justify-center gap-4">
				</div>
				<div class="flex items-center justify-center">
					<h1 class="mr-3 items-center text-xl">Quantidade:</h1>
					<div class="flex items-center gap-3 text-center">
					</div>
				</div>
				<p class="mt-3 text-right text-xl">
					Valor total: <span class="font-bold text-primary">R$</span>
				</p>
			</div>
			<Dialog.Footer>
				<Button type="submit" class="flex items-center">
					<p class="pr-2">Adicionar produto ao pedido</p>
					<Plus />
				</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</main>
