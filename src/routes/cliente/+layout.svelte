<script lang="ts">
	import type { LayoutData } from './$types'

	export let data: LayoutData
</script>

<main>
	<div class="p-4">
		<slot>Empty layout</slot>
	</div>
	<div
		class="fixed bottom-0 left-0 right-0 flex h-24 justify-between bg-gray-300 bg-opacity-50"
	>
		<button class="w-full text-center">cardapio</button>
		<button class="w-full text-center">carrinho</button>
		<button class="w-full text-center">seus pedidos</button>
	</div>
</main>
