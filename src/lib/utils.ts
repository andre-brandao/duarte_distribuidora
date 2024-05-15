import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 },
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (
		valueA: number,
		scaleA: [number, number],
		scaleB: [number, number],
	) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (
		style: Record<string, number | string | undefined>,
	): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t,
			});
		},
		easing: cubicOut,
	};
};

interface Disablable {
	disabled?: boolean;
}
import type { ActionReturn } from 'svelte/action';

function emit<T>(node: HTMLElement, name: string, detail?: T) {
	return node.dispatchEvent(new CustomEvent(`aa_${name}`, { detail }));
}

export interface IntersectParameters
	extends IntersectionObserverInit,
		Disablable {}

export type IntersectEvents = {
	'on:aa_intersect'?: (
		event: CustomEvent<{ entry: IntersectionObserverEntry }>,
	) => void;
	'on:aa_enter'?: (
		event: CustomEvent<{ entry: IntersectionObserverEntry }>,
	) => void;
	'on:aa_leave'?: (
		event: CustomEvent<{ entry: IntersectionObserverEntry }>,
	) => void;
};

export function intersect(
	node: HTMLElement,
	params: IntersectParameters,
): ActionReturn<IntersectParameters, IntersectEvents> {
	let observer: IntersectionObserver | null = null;
	function intersectHandler(entries: IntersectionObserverEntry[]) {
		if (params.disabled) return;
		for (const entry of entries) {
			emit(node, 'intersect', { entry });
			if (entry.isIntersecting) emit(node, 'enter', { entry });
			if (!entry.isIntersecting) emit(node, 'leave', { entry });
		}
	}

	function update(newParams: IntersectParameters) {
		// Remove old state
		observer?.disconnect();

		// Update state
		params = newParams;
		observer = new IntersectionObserver(intersectHandler, params);
		observer.observe(node);
	}

	function destroy() {
		observer?.disconnect();
	}

	update(params);

	return { update, destroy };
}

interface MaskParameters extends Disablable {
	mask: string;
}

// import type { MaskParameters } from './types.js';

export function mask(node: HTMLInputElement, params: MaskParameters) {
	let lastInputValue: string | null = null;

	function inputHandler() {
		if (params.disabled) return;
		if (lastInputValue === null) return;

		if (params.mask === 'money') {
			const input = node.value;
			node.value = formatMoney(input);

			return;
		}

		const pressedBackspace = lastInputValue.length - node.value.length === 1;
		if (!pressedBackspace) {
			const input = node.value;
			node.value = cleanAndFormat(input, params.mask);
		}
		lastInputValue = node.value;
	}

	function update(newParams: MaskParameters, init = false) {
		// Initalize
		if (init) {
			node.addEventListener('input', inputHandler);
			lastInputValue = node.value;
		}

		// Update state
		if (newParams.mask === 'money') {
			node.value = formatMoney(node.value);
		} else {
			params = newParams;
			node.value = cleanAndFormat(node.value, params.mask);
		}
	}

	function destroy() {
		node.removeEventListener('input', inputHandler);
	}

	update(params, true);

	return { update, destroy };
}

function formatMoney(input: string) {
	let newValue = input.replace(/\D/g, '');

	if (newValue.startsWith('0')) {
		newValue = newValue.substring(1);
	}
	while (newValue.length < 3) {
		newValue = '0' + newValue;
	}

	newValue = newValue.replace(/(\d)(\d{2})$/, '$1.$2');

	return newValue;
}

function cleanAndFormat(input: string, mask: string) {
	const cleanInput = clean(input, mask);
	return format(cleanInput, mask);
}

/*
	Both the clean and format functions were taken from the alpinejs source code: https://github.com/alpinejs/alpine/blob/main/packages/mask/src/index.js\
    clean -> stripDown
	format -> buildUp
*/
function format(input: string, mask: string) {
	const clean = Array.from(input);
	let output = '';
	for (let i = 0; i < mask.length; i++) {
		if (!['9', 'a', '*'].includes(mask[i])) {
			output += mask[i];
			continue;
		}

		if (clean.length === 0) break;

		output += clean.shift();
	}
	return output;
}

const regexes: Record<'9' | 'a' | '*', RegExp> = {
	'9': /[0-9]/,
	a: /[a-zA-Z]/,
	'*': /[a-zA-Z0-9]/,
};

function clean(input: string, mask: string) {
	let inputToBeStripped = input;
	let output = '';
	let wildcardmask = '';
	// Strip away non wildcard mask characters.
	for (let i = 0; i < mask.length; i++) {
		if (['9', 'a', '*'].includes(mask[i])) {
			wildcardmask += mask[i];
			continue;
		}

		for (let j = 0; j < inputToBeStripped.length; j++) {
			if (inputToBeStripped[j] === mask[i]) {
				inputToBeStripped =
					inputToBeStripped.slice(0, j) + inputToBeStripped.slice(j + 1);
				break;
			}
		}
	}
	for (let i = 0; i < wildcardmask.length; i++) {
		let found = false;
		for (let j = 0; j < inputToBeStripped.length; j++) {
			const currentWildcardmask = wildcardmask[i] as '9' | 'a' | '*';
			if (regexes[currentWildcardmask].test(inputToBeStripped[j])) {
				output += inputToBeStripped[j];
				inputToBeStripped =
					inputToBeStripped.slice(0, j) + inputToBeStripped.slice(j + 1);

				found = true;
				break;
			}
		}
		if (!found) break;
	}
	return output;
}

export function getEnderecoFromCEP(cep: string) {
	return fetch(`https://viacep.com.br/ws/${cep}/json/`)
		.then((res) => res.json())
		.then((data) => {
			if (data.erro) {
				return null;
			}
			return data;
		});
}
