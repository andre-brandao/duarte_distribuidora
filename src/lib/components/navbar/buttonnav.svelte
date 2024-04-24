<script lang="ts">
	import type { ComponentType } from 'svelte';
	import type { Icon } from 'lucide-svelte';
	export let href = '#';
	export let Icon: ComponentType<Icon> | null = null;
	export let label = '';
</script>

<li>
	<a {href} class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-yellow-400 transition ease-in-out">
		{#if Icon}
			<svelte:component	
				this={Icon}
				class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
			/>
		{/if}
		<span class="ms-3">{label}</span>
	</a>
</li>
