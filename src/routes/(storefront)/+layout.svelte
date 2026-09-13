<script>
    import SiteHeader from '$lib/ui/layout/SiteHeader.svelte';
    import SiteFooter from '$lib/ui/layout/SiteFooter.svelte';

    let { children } = $props();
</script>

<SiteHeader />

<main class="min-h-screen pt-[112px]">
    {@render children?.()}
</main>

<SiteFooter />
