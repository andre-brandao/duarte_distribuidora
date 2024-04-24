<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Plus } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';

	export let nome: string;
	export let celular: string;
</script>

<div class="flex items-center justify-between py-3">
	<div>
		<h2 class="text-xl font-bold">{nome}</h2>
		<h3 class="text-md text-gray-600">{celular}</h3>
	</div>
	<div>
		<Button class="flex items-center">
			<p class="pr-2">Adicionar</p>
			<Plus />
		</Button>
	</div>
</div>
<hr />