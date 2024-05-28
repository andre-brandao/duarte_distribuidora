<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import NumberInput from '$lib/components/ui/input/number_input.svelte';
	import { Label } from '$lib/components/ui/label';
	import type { Database } from '$lib/supabase-types';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { mask } from '$lib/utils';

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
		<input
			class=" mb-2 flex h-9 w-full rounded-md border border-gray-300 bg-transparent bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
			type="number"
			use:mask={{
				mask: 'money',
			}}
			bind:value={preco.preco_in_cents}
			on:change={(e) => (isChanged = true)}
		/>
		{#if isChanged}
			<Button on:click={updatePreco}>Salvar</Button>
		{/if}
	</div>
</div>
