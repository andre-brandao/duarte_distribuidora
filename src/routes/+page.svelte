<script lang="ts">
	let logo = '202403131209_krxb_i.jpg'
</script>

<div class="px-4 flex min-h-screen flex-col items-center justify-center">
	<img src={logo} alt="Logo" class="mb-2 max-h-60 max-w-60" />
	<h1 class="mb-4 text-4xl font-bold text-center">Bem-vindo ao Sistema do Duarte</h1>
	<div class="flex flex-col lg:flex-row gap-4">
		<a
			href="/cliente/cardapio"
			class="rounded-lg bg-primary px-6 py-2 text-black hover:bg-opacity-75 text-center transition"
			>Acessar produtos</a
		>
		<a
			href="/admin"
			class="rounded-lg bg-primary px-6 py-2 text-black hover:bg-opacity-75 text-center transition"
			>Administrador? Faça o Login</a
		>
	</div>
</div>
