<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Plus } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let cliente: {
		celular: string;
		cpf_cnpj: string | null;
		created_at: string;
		data_nascimento: string | null;
		email: string | null;
		id: number;
		nome: string;
		rg_ie: string | null;
		telefone_fixo: string | null;
	};
</script>

<div class="flex items-center justify-between py-3">
	<div>
		<h2 class="text-xl font-bold">{cliente.nome}</h2>
		<h3 class="text-md text-gray-600">{cliente.celular}</h3>
	</div>
	<div>
		<Button
			class="flex items-center"
			on:click={() => {
				dispatch('cliente_selecionado', { cliente });
			}}
		>
			<p class="pr-2">Vincular cliente</p>
			<Plus />
		</Button>
	</div>
</div>
<hr />
