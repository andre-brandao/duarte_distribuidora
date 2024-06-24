<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer'
	import Button from '$lib/components/ui/button/button.svelte'
	import { Check, ShoppingBasket } from 'lucide-svelte'
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js'
	import { toast } from 'svelte-sonner'

	let clienteId: number
	let itemsPedido = []
	let precoTotalPedido: number
</script>

<Drawer.Root>
	<Drawer.Trigger>
		<button class="w-full text-center font-semibold tracking-wider flex gap-3">Carrinho
			<ShoppingBasket />
		</button>
	</Drawer.Trigger>
	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title>
				Clique em finalizar pedido para realizar seu pedido!
			</Drawer.Title>
			<Drawer.Description>
				Seu pedido vai ser enviado para a distribuidora.
			</Drawer.Description>
		</Drawer.Header>
		<div class="mx-auto p-4">
			<h1 class="mb-2 text-center text-xl font-bold">Produtos no carrinho:</h1>
			<div class="flex flex-col">
				<ScrollArea class="h-[300px] w-[full] rounded-md border-2 p-3">
					{#if itemsPedido.length > 0}
						{#each itemsPedido as item}
							<div class="mb-2 flex flex-col rounded-lg border p-2">
								<p>
									<strong>Prato: </strong>{item.produto.nome}
								</p>
								<p>Quantidade: {item.quantidade}</p>
								<h1 class="text-xl font-bold">Preço: {item.precoTotal}</h1>
							</div>
						{/each}
					{:else}
						<p class="text-center">Seu carrinho está vazio.</p>
					{/if}
				</ScrollArea>
			</div>
			<h1 class="mt-2 text-center text-xl font-bold">
				Preco total: <span class="text-lime-500">R${precoTotalPedido}</span>
			</h1>
		</div>
		<Drawer.Footer>
			<Button
				>Finalizar Pedido!</Button
			>
			<Drawer.Close>Cancelar</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
