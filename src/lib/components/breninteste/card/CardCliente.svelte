<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Plus } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';

	export let nome: string;
	export let celular: string;
</script>

<hr />
<div class="flex py-3">
	<div class="flex-grow pl-4">
		<div>
			<h2 class="text-xl font-bold">{nome}</h2>
			<h3 class="text-md text-gray-600">{celular}</h3>
		</div>
	</div>
	<div class="w-full text-right">
		<span class="block pb-3 text-xl font-bold"></span>
		<Button class="flex-none">
			<p class="pr-2">Adicionar</p>
			<Plus />
		</Button>
	</div>
</div>
