<script lang="ts">
	import '../app.pcss';
	import { Button } from '$lib/components/ui/button/index.js';
	import Navbar from "$lib/components/navbar/navbar.svelte";
	import Login from '$lib/components/Login.svelte';

	import type { LayoutData } from './$types'
	export let data: LayoutData
	let { supabase } = data
	$: ({ supabase } = data)

	const user = data.session?.user
</script>

{#if !user}
	<Login {supabase} />
{:else}
	<main>
		<Navbar />
		<slot>Empty layout</slot>
	</main>
{/if}
