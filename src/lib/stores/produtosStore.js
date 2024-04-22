import { writable } from 'svelte/store';

export const produtos = writable([
	{
		nome: 'Heineken',
		id: 0,
		preco: 20,
		categoria: 'Cerveja',
		img: 'https://source.unsplash.com/HMimP8Jm_iI'
	},
	{
		nome: 'Stella',
		id: 1,
		preco: 30,
		categoria: 'Cerveja',
		img: 'https://source.unsplash.com/UErWoQEoMrc'
	},
	{
		nome: 'Budweiser',
		id: 2,
		preco: 25,
		categoria: 'Vinho',
		img: 'https://source.unsplash.com/Qy2KMPRV3X4'
	},
	{
		nome: 'Corona',
		id: 3,
		preco: 22,
		categoria: 'Cerveja',
		img: 'https://source.unsplash.com/1UDj1sTzmzQ'
	},
	{
		nome: 'Guinness',
		id: 4,
		preco: 28,
		categoria: 'Cerveja',
		img: 'https://source.unsplash.com/vCHHUpiU9sY'
	},
    {
        nome: 'Casillero del Diablo',
        id: 5,
        preco: 45,
        categoria: 'Vinho',
        img: 'https://source.unsplash.com/2d4lAQAlbDA'
    },
    {
        nome: 'Chandon',
        id: 6,
        preco: 60,
        categoria: 'Espumante',
        img: 'https://source.unsplash.com/K0E6E0a0R3A'
    },
    {
        nome: 'Jack Daniel\'s',
        id: 7,
        preco: 99,
        categoria: 'Whisky',
        img: 'https://source.unsplash.com/AU4VsulSo5k'
    },
    {
        nome: 'Absolut Vodka',
        id: 8,
        preco: 70,
        categoria: 'Vodka',
        img: 'https://source.unsplash.com/8ozTqB8uhns'
    },
    {
        nome: 'José Cuervo',
        id: 9,
        preco: 85,
        categoria: 'Tequila',
        img: 'https://source.unsplash.com/95YRwf6CNw8'
    }
]);
