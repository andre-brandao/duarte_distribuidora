<script lang="ts">
	export let modalInfo: HTMLDialogElement;
</script>

<dialog bind:this={modalInfo} on:close>
    <div>
        <slot />
    </div>
</dialog>

<style>
	dialog {
		border: none;
		border-radius: 8px;
	}

	dialog::backdrop {
		background-color: hsl(0 0% 0% / 40%);
	}
</style>
