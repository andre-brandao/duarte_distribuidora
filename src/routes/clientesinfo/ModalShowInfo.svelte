<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button';
	import { PencilLine } from 'lucide-svelte';

	export let celular: string;
	export let cpf_cnpj: string | null;
	export let created_at: string;
	export let data_nascimento: string | null;
	export let email: string | null;
	export let id: number;
	export let nome: string;
	export let rg_ie: string | null;
	export let telefone_fixo: string | null;
</script>

<main class="flex items-center justify-center">
	<Dialog.Root>
		<Dialog.Trigger>Informacoes completas</Dialog.Trigger>
		<Dialog.Content style="max-width: 600px;">
			<Dialog.Header>
				<Dialog.Title
					>Informações completas de <span class="font-bold text-primary"
						>{nome}</span
					></Dialog.Title
				>
			</Dialog.Header>
			<div class="mt-3 text-center text-lg">
				<hr />
				<p>
					<strong>ID:</strong>
					{id} - <strong>Nome:</strong>
					{nome || 'Não informada'}
				</p>
				<hr />
				<p>
					<strong>CPF/CNPJ:</strong>
					{cpf_cnpj || 'Não informada'} - <strong>RG/IE:</strong>
					{rg_ie || 'Não informado'}
				</p>
				<hr />
				<p><strong>E-mail:</strong> {email || 'Não informado'}</p>
				<hr />
				<p>
					<strong>Celular:</strong>
					{celular || 'Não informada'} - <strong>Fixo:</strong>
					{telefone_fixo || 'Não informado'}
				</p>
				<hr />
				<p>
					<strong>Data de Nascimento:</strong>
					{data_nascimento || 'Não informada'}
				</p>
				<hr />
				<p><strong>Data de Criação:</strong> {created_at}</p>
			</div>
			<Dialog.Footer>
				<Button type="submit" class="flex items-center">
					<p class="pr-2">Alterar Informações</p>
					<PencilLine />
				</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</main>

<style>
	p {
		margin-bottom: 5px;
		margin-top: 5px;
	}
</style>
