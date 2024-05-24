<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button';

	export let produto: {
		nome: string | undefined;
		quantidade: number;
	};
</script>

<main class="flex items-center justify-center">
	<Dialog.Root>
		<Dialog.Trigger>
			<Button>Entrada</Button>
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[600px]">
			<Dialog.Header>
				<Dialog.Title>Entrada de estoque</Dialog.Title>
				<Dialog.Description>
					Digite a quantidade e clique em salvar!
				</Dialog.Description>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="quantidade" class="text-right"
						>Entrada {produto.nome}</Label
					>
					<Input id="estoque" bind:value={produto.quantidade} class="col-span-3" />
				</div>
			</div>
			<Dialog.Footer>
				<Button type="submit">Salvar</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</main>
