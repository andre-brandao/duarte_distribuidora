<script lang="ts">
	import '../app.pcss';
	import { Button } from '$lib/components/ui/button/index.js';
	import Navbar from '$lib/components/navbar/navbar.svelte';
	import LoginPage from '$lib/components/LoginPage.svelte';

	import { Toaster } from '$lib/components/ui/sonner';

	import type { LayoutData } from './$types';
	export let data: LayoutData;
	let { supabase } = data;
	$: ({ supabase } = data);

	const user = data.session?.user;
</script>

<Toaster />

{#if !user}
	<LoginPage {supabase} />
{:else}
	<main>
		<Navbar {supabase} />
		<div class="p-4 sm:ml-64">
			<slot>Empty layout</slot>
		</div>
	</main>
{/if}
