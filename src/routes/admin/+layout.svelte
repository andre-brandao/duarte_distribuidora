<script lang="ts">
	import type { LayoutData } from './$types'
	import { Button } from '$lib/components/ui/button/index.js'
	import Navbar from '$lib/components/navbar/navbar.svelte'
	import LoginPage from '$lib/components/LoginPage.svelte'
	import { conferePermissao } from '$lib/permissoes'

	export let data: LayoutData

	let { supabase } = data
	$: ({ supabase } = data)

	const user = data.session?.user

	conferePermissao.set(data.permissoes)

    //conferePermissao.conferirPermissao()
</script>

<main>
	<Navbar {supabase} />
	<div class=" p-4 sm:ml-64">
		<slot>Empty layout</slot>
	</div>
</main>
