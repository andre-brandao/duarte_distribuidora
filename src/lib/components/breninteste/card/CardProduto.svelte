<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	export let produto = {
		nome: 'Heinekein',
		id: 0,
		preco: 10,
		categoria: 'Cerveja',
		imagem: 'https://picsum.photos/200'
	};
</script>

<main class="mt-5 flex items-center justify-center">
	<button>
		<Card.Root class="w-auto">
			<div class="row flex">
				<div class="column">
					<Card.Header>
						<Card.Title class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
							>{produto.nome}</Card.Title
						>
					</Card.Header>
					<Card.Content class="flex items-center">
						<div class="flex-grow">
							<p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
								Categoria: {produto.categoria}
							</p>
							<p class="text-2xl font-bold text-gray-900 dark:text-white">R${produto.preco}</p>
						</div>
					</Card.Content>
				</div>
				<div class="column">
					<img src={produto.imagem} alt="" class="ml-auto rounded-r-xl object-cover" />
				</div>
			</div>
		</Card.Root>
	</button>
</main>
