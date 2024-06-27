<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData

	let users = data.infouser

	console.log(users)

	const permissoes = ['x', 'y', 'z']

	//
	//
	//
	//
	//
	//
	//NAO MEXI DIREITO, SÓ FIZ O VISUAL, APENAS
	//
	//
	//
	//
	//
	//
	//
</script>

<div class="min-h-screen bg-gray-100 p-6">
	<div class="min-w-4xl mx-auto overflow-hidden rounded-lg bg-white shadow-md">
		<h2 class="mb-4 p-6 text-2xl font-bold">Permissoes dos usuarios</h2>
		<div class="overflow-x-auto p-6">
			<table class="min-w-full bg-white">
				<thead>
					<tr>
						<th class="border-b px-4 py-2 text-left">Nome</th>
						<th class="border-b px-4 py-2 text-left">email</th>
						<th class="border-b px-4 py-2 text-right">Tipo usuario</th>
						<th class="border-b px-4 py-2 text-right">Gerenciar permissions</th>
					</tr>
				</thead>
				<tbody>
					{#each users as user}
						<tr class="border-b">
							<td class="px-4 py-2">{user.nome}</td>
							<td class="px-4 py-2">{user.email}</td>
							<td class="px-4 py-2 text-right">{user.tipo}</td>
							<td class="px-4 py-2">
								<div class="flex justify-end space-x-4">
									<!--AO INVES DE USAR ESSE ARRAY COLOCAR user.permissoes-->
									{#each permissoes as permissao}
										<label class="inline-flex items-center">
											<input
												type="checkbox"
												class="form-checkbox h-5 w-5 text-primary"
											/>
											<span class="ml-2">{permissao}</span>
										</label>
									{/each}
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
