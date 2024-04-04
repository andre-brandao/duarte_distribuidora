<script lang="ts">
	import type { PageData } from './$types.js';
	import ProdutoForm from './cliente_form.svelte';
	export let data: PageData;
</script>



<main class="flex justify-center">

    <ProdutoForm data={data.form} />
</main>
