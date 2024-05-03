<script lang="ts">
    import  Button  from '$lib/components/ui/button/button.svelte';
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
    import { DollarSign  } from 'lucide-svelte';

</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
        <Button builders={[builder]} variant="dropdown">Precos</Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-56">
        <DropdownMenu.Label>Tipo de preco</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
            <DropdownMenu.Item>
                <DollarSign class="mr-2 h-4 w-4" />
                <span>Aqui vai vir os tipos preco</span>
            </DropdownMenu.Item>
        </DropdownMenu.Group>
    </DropdownMenu.Content>
</DropdownMenu.Root>
