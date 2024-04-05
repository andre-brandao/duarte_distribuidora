<script lang="ts">
	import CardProduto from '$lib/components/breninteste/card/CardProduto.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<div class="grid grid-cols-3">
		{#each new Array(9) as item}
			<CardProduto />
		{/each}
	</div>                       
</div>