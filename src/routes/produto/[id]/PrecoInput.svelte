<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import NumberInput from '$lib/components/ui/input/number_input.svelte';
	import { Label } from '$lib/components/ui/label';
	import type { Database } from '$lib/supabase-types';
	import type { SupabaseClient } from '@supabase/supabase-js';

	export let supabase: SupabaseClient<Database>;

	export let preco: {
		created_at: string;
		id: number;
		preco_in_cents: number;
		tipo: string;
		var_produto_id: number;
	};

	let isChanged = false;

	async function updatePreco() {
		const { data, error } = await supabase
			.from('preco')
			.update({
				preco_in_cents: preco.preco_in_cents,
				tipo: preco.tipo,
			})
			.eq('id', preco.id);

		if (error) {
			console.error(error);
			return;
		}
		isChanged = false;
	}
</script>

<div>
	<Label>{preco.tipo}</Label>
	<div class="flex">
		<NumberInput
			bind:value={preco.preco_in_cents}
			on:change={(e) => (isChanged = true)}
		/>
		{#if isChanged}
			<Button on:click={updatePreco}>Salvar</Button>
		{/if}
	</div>
</div>
