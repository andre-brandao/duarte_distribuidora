<script lang="ts">
	import DrawerPedido from './DrawerPedido.svelte'
</script>

<main>
	<div class="p-4">
		<slot>Empty layout</slot>
	</div>
	<div
		class="fixed bottom-0 left-0 right-0 flex h-20 justify-between bg-gray-300 bg-opacity-60"
	>
		<button class="w-full text-center font-semibold tracking-wider">Cardapio</button>
		<button class="w-full text-center font-semibold tracking-wider">Pedidos</button>
		<div class="flex w-full items-center justify-center">
			<DrawerPedido />
		</div>
	</div>
</main>
