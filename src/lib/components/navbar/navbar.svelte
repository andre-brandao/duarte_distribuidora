<script>
	import ButtonNav from './buttonnav.svelte';
	import { CirclePlus, Package, ShoppingCart, UserPlus } from 'lucide-svelte';
</script>

<!-- <nav class="border border-gray-200 bg-gray-50">
	<div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
		<div>
			<a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
				<span class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white"
					>Duarte Distribuidora</span
				>
			</a>
		</div>

		<div class="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
			<ul
				class="mt-4 flex flex-col rounded-lg font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:dark:bg-transparent rtl:space-x-reverse"
			>
				<ButtonNav href="/test" label="Novo produto" Icon={CirclePlus} />
				<ButtonNav href="/cliente" label="Novo cliente" Icon={UserPlus} />
				<ButtonNav href="/estoque" label="Estoque" Icon={Package} />
				<ButtonNav href="/pedidoscaixa" label="Pedidos no caixa" Icon={ShoppingCart} />
			</ul>
		</div>
	</div>
</nav> -->
<button
	data-drawer-target="sidebar-multi-level-sidebar"
	data-drawer-toggle="sidebar-multi-level-sidebar"
	aria-controls="sidebar-multi-level-sidebar"
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
	id="default-sidebar"
	class="fixed left-0 top-0 z-40 h-screen w-auto -translate-x-full transition-transform sm:translate-x-0"
	aria-label="Sidebar"
>
	<div class="h-full overflow-y-auto border bg-gray-100 py-4 px-3">
		<a href="/" class="mb-5 flex items-center space-x-3 rtl:space-x-reverse">
			<span class="self-center whitespace-nowrap text-2xl font-semibold">Duarte Distribuidora</span>
		</a>
		<ul class="space-y-2 font-medium">
			<ButtonNav href="/test" label="Novo produto" Icon={CirclePlus} />
			<ButtonNav href="/cliente" label="Novo cliente" Icon={UserPlus} />
			<ButtonNav href="/estoque" label="Estoque" Icon={Package} />
			<ButtonNav href="/pedidoscaixa" label="Pedidos no caixa" Icon={ShoppingCart} />
		</ul>
	</div>
</aside>

