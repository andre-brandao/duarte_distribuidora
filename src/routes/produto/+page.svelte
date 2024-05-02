<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const produtos = data.produtos;
</script>

<main class="container">
	<div class="flex flex-col gap-3 justify-center items-center">
		{#each produtos as produto}
			<a class="hover:underline" href="/produto/{produto.id}">{produto.nome}</a>
		{/each}
	</div>
</main>
