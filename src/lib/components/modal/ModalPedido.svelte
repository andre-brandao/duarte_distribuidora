<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Plus, Minus } from 'lucide-svelte';
	import { pedidoStore } from '$lib/stores/pedidoStore';

	let quantidade = 1;

	export let nome: string;
	export let preco: number;
	export let categoria: string;
	export let img: string;

	let precoTotal = preco;

	function increase() {
		quantidade += 1;
		precoTotal += preco;
	}

	function decrease() {
		if (quantidade > 1) {
			quantidade -= 1;
			precoTotal -= preco;
		}
	}
</script>

<main class="mt-5 flex items-center justify-center">
	<Dialog.Root>
		<Dialog.Trigger>
			<Card.Root class="w-auto">
				<div class="row flex">
					<div class="column">
						<Card.Header>
							<Card.Title
								class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
								>{nome}</Card.Title
							>
						</Card.Header>
						<Card.Content class="flex items-center">
							<div class="flex-grow">
								<p
									class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400"
								>
									Categoria: {categoria}
								</p>
								<p class="text-2xl font-bold text-gray-900 dark:text-white">
									R${preco}
								</p>
							</div>
						</Card.Content>
					</div>
					<div class="column">
						<img
							src={img}
							alt=""
							class="ml-auto h-52 w-48 rounded-r-xl object-cover"
						/>
					</div>
				</div>
			</Card.Root>
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[600px]">
			<Dialog.Header>
				<Dialog.Title
					>Adicionar <span class="font-bold text-primary">{nome}</span> ao seu pedido</Dialog.Title
				>
				<Dialog.Description>
					Selecione a quantidade e clique em adicionar!
				</Dialog.Description>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				<div class=" h-10 w-10 items-center justify-center gap-4">
					<img class="" src={img} alt="imagem {nome}" />
				</div>
				<div class="flex items-center justify-center">
					<h1 class="mr-3 items-center text-xl">Quantidade:</h1>
					<div class="flex items-center gap-3 text-center">
						<Button on:click={decrease}><Minus /></Button>
						<p class="text-xl font-bold">{quantidade}</p>
						<Button on:click={increase}><Plus /></Button>
					</div>
				</div>
				<p class="mt-3 text-right text-xl">
					Valor total: <span class="font-bold text-primary">R${precoTotal}</span>
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
