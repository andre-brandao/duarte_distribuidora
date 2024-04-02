<script>
	import '../app.pcss';
</script>

<nav class=" m-1 flex justify-between bg-primary p-2">
	<a href="/"> Duarte Distribuidora </a>

	<div class="flex gap-2">
		<a href="/produtos" class="hover:underline">Novo Produto </a>
		<a href="/cliente" class="hover:underline">Novo Cliente </a>
		<a href="/estoque" class="hover:underline"> Estoque </a>
	</div>
</nav>
<slot />
