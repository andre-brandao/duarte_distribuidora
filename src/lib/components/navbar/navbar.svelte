<script lang="ts">
	import ButtonNav from './buttonnav.svelte';
	import { CirclePlus, Package, ShoppingCart, UserPlus, SquareMenu } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	import type { Icon } from 'lucide-svelte';

	let itens: {
		label: string;
		href: string;
		icon: ComponentType<Icon>;
	}[] = [
		{ label: 'Novo produto', href: '/test', icon: CirclePlus },
		{ label: 'Novo cliente', href: '/cliente', icon: UserPlus },
		{ label: 'Estoque', href: '/estoque', icon: Package },
		{ label: 'Pedidos no caixa', href: '/pedidoscaixa', icon: ShoppingCart },
		{ label: 'Cardapio online', href: '/cardapio', icon: SquareMenu }
	];
</script>

<button
	data-drawer-target="logo-sidebar"
	data-drawer-toggle="logo-sidebar"
	aria-controls="logo-sidebar"
	type="button"
	class="ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
>
	<span class="sr-only">Open sidebar</span>
	<svg
		class="h-6 w-6"
		aria-hidden="true"
		fill="currentColor"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			clip-rule="evenodd"
			fill-rule="evenodd"
			d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
		></path>
	</svg>
</button>

<aside
	id="logo-sidebar"
	class="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
	aria-label="Sidebar"
>
	<div class="h-full overflow-y-auto border bg-gray-100 px-3 py-4">
		<a href="/" class="mb-5 flex items-center ps-2.5">
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
				>Duarte Distribuidora</span
			>
		</a>
		<ul class="space-y-2 font-medium">
			{#each itens as item}
				<ButtonNav href={item.href} label={item.label} Icon={item.icon} />
			{/each}
		</ul>
	</div>
</aside>
