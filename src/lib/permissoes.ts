import { writable, get } from 'svelte/store'

export function temPermissao(
	permissoes: {
		nome: string
	}[],
	temAPermissao: string,
) {
	return permissoes.includes({
		nome: temAPermissao,
	})
}

function createPermissaoStore() {
	const baseStore = writable<
		{
			nome: string
		}[]
	>([])
	function conferirPermissao(temAPermissao: string) {
		const permissoes = get(baseStore)
		return permissoes.includes({
			nome: temAPermissao,
		})
	}

	function set(
		init:
			| {
					nome: string
			  }[]
			| null
			| undefined,
	) {
		if (init) {
			baseStore.set(init)
		}
	}
	return { set, conferirPermissao }
}

export let conferePermissao = createPermissaoStore()
