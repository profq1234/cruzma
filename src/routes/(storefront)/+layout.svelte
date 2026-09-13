<script>
    import '../../app.css';
    import SiteHeader from '$lib/ui/layout/SiteHeader.svelte';
    import SiteFooter from '$lib/ui/layout/SiteFooter.svelte';
</script>

<SiteHeader />
<main class="min-h-screen pt-20">
    <slot />
</main>
<SiteFooter />
