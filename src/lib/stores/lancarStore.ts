import { writable, get } from 'svelte/store';

function createPedidoStore() {
	let pedidoBaseStore = writable<
		{
			estoque_id: number;
			quantidade: number;
			preco_custo: number;
			nome: string;
		}[]
	>([]);
	const { set, subscribe, update } = pedidoBaseStore;

	function removeTodosItemPedido(var_produto_id: number) {
		update((array_pedidos) => {
			const exists = array_pedidos.findIndex(
				(p) => p.estoque_id === var_produto_id,
			);

			if (exists !== -1) {
				return array_pedidos.filter((p, i) => i !== exists);
			}

			return array_pedidos;
		});
	}

	function removeUmItemPedido(estoqe_id: number) {
		console.log(estoqe_id);

		update((array_pedidos) => {
			const exists = array_pedidos.findIndex((p) => p.estoque_id === estoqe_id);
			if (exists !== -1) {
				if (array_pedidos[exists].quantidade === 1) {
					return array_pedidos.filter((_, i) => i !== exists);
				}
				if (array_pedidos[exists].quantidade > 1) {
					array_pedidos[exists].quantidade--;
				}
			}

			return array_pedidos;
		});
	}

	function addItemPedido(produto: {
		estoque_id: number;
		preco_custo: number;
		nome: string;
	}) {
		console.log(produto);

		update((array_pedidos) => {
			if (!array_pedidos) {
				return [
					{
						quantidade: 1,
						preco_custo: produto.preco_custo,
						estoque_id: produto.estoque_id,
						nome: produto.nome,
					},
				];
			}

			const exists = array_pedidos.findIndex(
				(p) => p.estoque_id === produto.estoque_id,
			);

			if (exists !== -1) {
				array_pedidos[exists].quantidade++;
				return array_pedidos;
			}

			return [
				{
					quantidade: 1,
					preco_custo: produto.preco_custo,
					estoque_id: produto.estoque_id,
					nome: produto.nome,
				},
				...array_pedidos,
			];
		});
	}

	function setQuantidadePedido(produto: {
		estoque_id: number;
		quantidade: number;
		preco_custo: number;
		nome: string;
	}) {
		if (produto.quantidade === 0) {
			removeTodosItemPedido(produto.estoque_id);
			return;
		}

		update((array_pedidos) => {
			const exists = array_pedidos.findIndex(
				(p) => p.estoque_id === produto.estoque_id,
			);
			if (exists === -1) {
				// se nao existe
				array_pedidos.push(produto);
				return array_pedidos;
			}
			array_pedidos[exists].quantidade = produto.quantidade;
			return array_pedidos;
		});
	}

	return {
		set,
		subscribe,
		update,
		addItemPedido,
		setQuantidadePedido,
		removeTodosItemPedido,
		removeUmItemPedido,
	};
}

export let lancarStore = createPedidoStore();
