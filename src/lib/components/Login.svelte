<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { Database } from '../supabase-types';
	import { createEventDispatcher } from 'svelte';
	import { Key } from 'lucide-svelte';

	const dispatch = createEventDispatcher();

	export let supabase: SupabaseClient;

	let email: string;
	let password: string;

	let erros = '';

	async function signIn() {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			console.error(error);
			erros = error.message;
			return;
		}
		window.location.reload();
	}
</script>

<section class="bg-gray-50">
	<div
		class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-[100vh] lg:py-0"
	>
		<a
			href="/"
			class="mb-6 flex items-center text-2xl font-semibold text-gray-900"
		>
			Duarte Distribuidora
		</a>
		<div class="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
			<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
				<h1
					class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
				>
					Faça login na sua conta
				</h1>
				<form class="space-y-4 md:space-y-6">
					<div>
						<label
							for="email"
							class="mb-2 block text-sm font-medium text-gray-900"
							>Seu email:</label
						>
						<input
							type="email"
							name="email"
							id="email"
							class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary sm:text-sm"
							placeholder="nome@company.com"
							bind:value={email}
						/>
					</div>
					<p class="text-sm font-medium text-red-500" hidden={!erros}>
						{erros}
					</p>
					<div>
						<label
							for="password"
							class="mb-2 block text-sm font-medium text-gray-900">Senha</label
						>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="********"
							class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
							bind:value={password}
						/>
					</div>
					<button
						type="button"
						class="w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-semibold text-secondary-foreground shadow-sm transition ease-in-out hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-primary"
						on:click={signIn}
						on:keydown={(e) => {
							console.log(e);
							if (e.key == 'Enter') {
								signIn();
							}
						}}>Login</button
					>
					<p class="text-sm font-light text-gray-500">
						Não possui uma conta, <button
							on:click={() => dispatch('signup')}
							class="font-medium text-primary hover:underline"
							>cadastre-se</button
						>
						?
					</p>
				</form>
			</div>
		</div>
	</div>
</section>
