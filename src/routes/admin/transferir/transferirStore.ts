import { writable, get } from 'svelte/store';

function createPedidoStore() {
	let pedidoBaseStore = writable<
		{
			var_produto_id: number;
			quantidade: number;
			unidade_em_cents: number;
			nome: string;
		}[]
	>([]);
	const { set, subscribe, update } = pedidoBaseStore;

	function removeTodosItemPedido(var_produto_id: number) {
		update((array_pedidos) => {
			const exists = array_pedidos.findIndex(
				(p) => p.var_produto_id === var_produto_id,
			);

			if (exists !== -1) {
				return array_pedidos.filter((p, i) => i !== exists);
			}

			return array_pedidos;
		});
	}

	function removeUmItemPedido(var_produto_id: number) {
		console.log(var_produto_id);

		update((array_pedidos) => {
			const exists = array_pedidos.findIndex(
				(p) => p.var_produto_id === var_produto_id,
			);
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
		var_produto_id: number;
		unidade_em_cents: number;
		nome: string;
	}) {
		console.log(produto);

		update((array_pedidos) => {
			if (!array_pedidos) {
				return [
					{
						quantidade: 1,
						unidade_em_cents: produto.unidade_em_cents,
						var_produto_id: produto.var_produto_id,
						nome: produto.nome,
					},
				];
			}

			const exists = array_pedidos.findIndex(
				(p) => p.var_produto_id === produto.var_produto_id,
			);

			if (exists !== -1) {
				array_pedidos[exists].quantidade++;
				return array_pedidos;
			}

			return [
				{
					quantidade: 1,
					unidade_em_cents: produto.unidade_em_cents,
					var_produto_id: produto.var_produto_id,
					nome: produto.nome,
				},
				...array_pedidos,
			];
		});
	}

	return {
		set,
		subscribe,
		update,
		addItemPedido,
		removeTodosItemPedido,
		removeUmItemPedido,
	};
}

export let transferirStore = createPedidoStore();
