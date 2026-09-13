<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    onMount(() => {
        goto('/shop');
    });
</script>

<div class="min-h-screen flex items-center justify-center bg-neutral-50 text-neutral-900 font-serif">
    <p class="text-sm tracking-widest uppercase animate-pulse">Entering Manner...</p>
</div>
