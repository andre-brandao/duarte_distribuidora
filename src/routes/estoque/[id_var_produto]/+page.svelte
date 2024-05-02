<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const estoque = data.estoque;
</script>

<main class="container flex items-center justify-center">
	<pre class="">{JSON.stringify(estoque)}</pre>
</main>
