<script lang="ts">
	import ButtonCliente from './../buttons/ButtonCliente.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import CardProduto from '$lib/components/breninteste/card/CardProduto.svelte';
	import { searchTerm, categoriasUnicas, filteredProdutos } from '$lib/stores/filtroProdutosStore';
	import { UserPlus } from 'lucide-svelte';

	function setFilter(categoria: string) {
		$searchTerm = categoria;
	}
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<ButtonCliente label={'Vincular compra a cliente'} Icon={UserPlus} />
	</Dialog.Trigger>
	<Dialog.Content class="flex h-[600px] overflow-hidden sm:max-w-[900px]">
		<Dialog.Header class="sticky top-0 bg-white">
			<Dialog.Title class="pr-3 text-center text-3xl">Vincular compra a um cliente</Dialog.Title>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
