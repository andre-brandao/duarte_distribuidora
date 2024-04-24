import { writable } from 'svelte/store';

export const clientes = writable([
	{ id: 1, nome: 'Cliente 1', celular: '98785-2353', email: 'cliente1@example.com' },
	{ id: 2, nome: 'Cliente 2', celular: '99617-3556', email: 'cliente2@example.com' }
]);
