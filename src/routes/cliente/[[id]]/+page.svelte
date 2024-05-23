<script lang="ts">
	import type { PageData } from './$types.js';
	export let data: PageData;
	import ProdutoForm from './cliente_form.svelte';
</script>

<main class="flex justify-center">
		<div class="rounded-lg border-2 border-dashed border-gray-200 p-4">
			<h1 class="self-center whitespace-nowrap text-center text-4xl font-semibold">Cadastrar cliente</h1>
			<ProdutoForm data={data.form} />
		</div>
</main>
