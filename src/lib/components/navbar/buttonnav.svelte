<script lang="ts">
	import type { ComponentType } from 'svelte';
	import type { Icon } from 'lucide-svelte';
	import { page } from '$app/stores';
	export let href = '#';
	export let Icon: ComponentType<Icon> | null = null;
	export let label = '';
	
</script>

<a
	{href}
	class="group flex items-center rounded-lg p-2 text-gray-900 transition ease-in-out hover:bg-yellow-400"
	class:bg-yellow-300={$page.url.pathname.startsWith(href)}
>
	{#if Icon}
		<svelte:component
			this={Icon}
			class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
		/>
	{/if}
	<span class="ms-3">{label}</span>
</a>
