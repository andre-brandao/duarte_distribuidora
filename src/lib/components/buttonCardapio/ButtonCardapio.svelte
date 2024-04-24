<script lang="ts">
	import type { ComponentType } from 'svelte';
	import type { Icon } from 'lucide-svelte';
	export let href = '#';
	export let Icon: ComponentType<Icon> | null = null;
	export let label = '';
</script>

<li class="list-none">
	<a
		{href}
		class="group flex content-center items-center justify-center rounded-lg transition ease-in-out bg-primary py-2 text-center font-semibold text-secondary-foreground shadow-sm hover:bg-yellow-300"
	>
		<span class="mr-1">{label}</span>
		{#if Icon}
			<svelte:component
				this={Icon}
				class="h-5 w-5 ml-1 transition duration-75 group-hover:text-gray-900"
			/>
		{/if}
	</a>
</li>
