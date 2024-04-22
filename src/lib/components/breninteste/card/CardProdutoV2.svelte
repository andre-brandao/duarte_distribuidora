<script lang="ts">
	import * as Card from '$lib/components/ui/card';
    import DefaultModal from '$lib/components/modal/DefaultModal.svelte';

	export let nome: string;
	export let preco: number;
	export let categoria: string;
	export let img: string;
</script>

<main class="mt-5 flex items-center justify-center">
    <DefaultModal />
	<button>
		<Card.Root class="w-auto">
			<div class="row flex">
				<div class="column">
					<Card.Header>
						<Card.Title class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
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
					<img src={img} alt="" class="ml-auto rounded-r-xl object-cover w-48 h-52" />
				</div>
			</div>
		</Card.Root>
	</button>
</main>