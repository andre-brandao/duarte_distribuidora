<script lang="ts">
	import '../app.pcss';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<nav class="border-gray-200 bg-gray-50">
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
				class="mt-4 flex flex-col rounded-lg bg-gray-50 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:dark:bg-transparent rtl:space-x-reverse"
			>
				<Button variant="brenovar" href="/test">Novo produto</Button>
				<Button variant="brenovar" href="/cliente">Novo cliente</Button>
				<Button variant="brenovar" href="/estoque">Estoque</Button>
			</ul>
		</div>
	</div>
</nav>

<slot />
