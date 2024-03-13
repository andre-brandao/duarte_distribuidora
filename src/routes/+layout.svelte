<script>
	import '../app.pcss';
</script>

<nav class=" m-1 flex justify-between bg-primary p-2">
	<a href="/"> Duarte Distribuidora </a>

	<div class="flex gap-2">
		<a href="/produtos" class="hover:underline"> Produtos </a>
		<a href="/cliente" class="hover:underline"> Clientes </a>
	</div>
</nav>
<slot />
