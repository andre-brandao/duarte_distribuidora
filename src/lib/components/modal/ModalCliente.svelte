<script lang="ts">
	import ButtonCliente from './../buttons/ButtonCliente.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import CardCliente from '../breninteste/card/CardCliente.svelte';
	import { searchTerm, categoriasUnicas, filteredProdutos } from '$lib/stores/filtroProdutosStore';
	import { clientes } from '$lib/stores/clientesStore';
	import { UserPlus } from 'lucide-svelte';
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<ButtonCliente label={'Vincular compra a cliente'} Icon={UserPlus} />
	</Dialog.Trigger>
	<Dialog.Content class="flex h-[600px] overflow-hidden sm:max-w-[900px]">
		<div class="w-full overflow-y-auto">
			<Dialog.Header class="sticky top-0 bg-white">
				<div class="gap-0 pb-5">
					<div class=" flex items-center justify-between gap-0 pr-5">
						<Dialog.Title class="pr-3 text-center text-3xl"
							>Vincular compra a um cliente:</Dialog.Title
						>
						<Input
							id="name"
							placeholder="Pesquisar cliente..."
							class="col-span-1 h-auto w-auto py-1"
						/>
					</div>
				</div>
			</Dialog.Header>
			<div class="grid pr-5">
				{#each $clientes as cliente (cliente.id)}
					<CardCliente nome={cliente.nome} email={cliente.email} celular={cliente.celular} />
				{/each}
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
