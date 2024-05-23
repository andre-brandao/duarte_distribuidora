<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button';

	export let nome: string;
	export let preco: number;
	export let categoria: string;
	export let img: string;
</script>

<main class="mt-5 flex items-center justify-center">
	<Dialog.Root>
		<Dialog.Trigger>
			<Card.Root class="w-auto">
				<div class="row flex">
					<div class="column">
						<Card.Header>
							<Card.Title
								class="mb-2 text-2xl font-bold tracking-tight text-gray-900"
								>{nome}</Card.Title
							>
						</Card.Header>
						<Card.Content class="flex items-center">
							<div class="flex-grow">
								<p class="mb-3 font-normal leading-tight text-gray-700">
									Categoria: {categoria}
								</p>
								<p class="text-2xl font-bold text-gray-900">R${preco}</p>
							</div>
						</Card.Content>
					</div>
					<div class="column">
						<img src={img} alt="" class="ml-auto h-52 w-48 rounded-r-xl object-cover" />
					</div>
				</div>
			</Card.Root>
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[600px]">
			<Dialog.Header>
				<Dialog.Title>Editar {nome}</Dialog.Title>
				<Dialog.Description>
					Faca as alteracões em {nome} e depois clique em salvar!
				</Dialog.Description>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="name" class="text-right">Nome</Label>
					<Input id="name" value="{nome}" class="col-span-3" />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="category" class="text-right">Categoria</Label>
					<Input id="category" value="{categoria}" class="col-span-3" />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="price" class="text-right">Preco</Label>
					<Input id="price" value="{preco}" class="col-span-3" />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="imagem" class="text-right">Imagem</Label>
					<Input id="imagem" type="file" accept="image/*" class="col-span-3" />
				</div>
			</div>
			<Dialog.Footer>
				<Button type="submit">Salvar alteracões</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</main>
