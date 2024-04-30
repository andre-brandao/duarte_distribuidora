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
		class="group mb-4 flex xl:w-96 content-center items-center justify-center rounded-lg border-2 border-primary bg-transparent py-1 text-center font-light text-secondary-foreground transition ease-in-out hover:border-transparent hover:bg-primary"
	>
		<span class="mr-1">{label}</span>
		{#if Icon}
			<svelte:component
				this={Icon}
				class="ml-1 h-5 w-5 transition duration-75 group-hover:text-gray-900"
			/>
		{/if}
	</a>
</li>
