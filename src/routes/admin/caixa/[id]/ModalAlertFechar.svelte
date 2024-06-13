<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js'
	import * as Dialog from '$lib/components/ui/dialog/index.js'
	import { Input } from '$lib/components/ui/input/index.js'
	import { Label } from '$lib/components/ui/label/index.js'
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })}
		>Fechar caixa</Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Fechar o caixa</Dialog.Title>
			<Dialog.Description>
				Resumo a partir da abertura do caixa:
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<h1>
				Quantidade de vendas no caixa: <span class="font-medium">1000</span>
			</h1>
			<h1>Total em vendas: <span class="font-medium">R$00.00</span></h1>
			<h1>
				Valor do caixa antes do dia: <span class="font-medium">R$00.00</span>
			</h1>
			<h1>
				Valor do caixa depois do dia: <span class="font-medium">R$00.00</span>
			</h1>
		</div>
		<Dialog.Footer>
			<slot />
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
