<script lang="ts">
	import type { PageData } from './$types.js';
	import ProdutoForm from './produto_form.svelte';
	export let data: PageData;
</script>



<main class="flex justify-center items-center md:h-screen">

    <ProdutoForm data={data.form} />
</main>
