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
								class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
								>{nome}</Card.Title
							>
						</Card.Header>
						<Card.Content class="flex items-center">
							<div class="flex-grow">
								<p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
									Categoria: {categoria}
								</p>
								<p class="text-2xl font-bold text-gray-900 dark:text-white">R${preco}</p>
							</div>
						</Card.Content>
					</div>
					<div class="column">
						<img src={img} alt="" class="ml-auto h-52 w-48 rounded-r-xl object-cover" />
					</div>
				</div>
			</Card.Root>
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Edit profile</Dialog.Title>
				<Dialog.Description>
					Make changes to your profile here. Click save when you're done.
				</Dialog.Description>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="name" class="text-right">Name</Label>
					<Input id="name" value="Pedro Duarte" class="col-span-3" />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="username" class="text-right">Username</Label>
					<Input id="username" value="@peduarte" class="col-span-3" />
				</div>
			</div>
			<Dialog.Footer>
				<Button type="submit">Save changes</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</main>
