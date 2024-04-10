<script lang="ts">
	import type { PageData } from './$types.js';
	import ProdutoForm from './cliente_form.svelte';
	export let data: PageData;
</script>

<main class="flex justify-center">
	<div class="p-4 sm:ml-64">
		<div class="rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
			<ProdutoForm data={data.form} />
		</div>
	</div>
</main>
