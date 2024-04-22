import { writable, derived } from 'svelte/store';
import { produtos } from './produtosStore';

export const searchTerm = writable('');

export const categoriasUnicas = derived(produtos, ($produtos) =>
	Array.from(new Set($produtos.map((produto) => produto.categoria)))
);

export const filteredProdutos = derived([produtos, searchTerm], ([$produtos, $searchTerm]) =>
	$produtos.filter((produto) => {
		const nomeMatch = produto.nome.toLowerCase().includes($searchTerm.toLowerCase());
		const categoriaMatch = produto.categoria.toLowerCase().includes($searchTerm.toLowerCase());
		return nomeMatch || categoriaMatch;
	})
);
