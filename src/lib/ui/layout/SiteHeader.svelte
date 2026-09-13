<script>
    import { createEventDispatcher } from 'svelte';

    export let cartCount = 0;
    export let isCartOpen = false;

    const dispatch = createEventDispatcher();

    let isMobileMenuOpen = false;
    let isSearchOpen = false;
    let searchQuery = '';

    const toggleCart = () => {
        dispatch('toggleCart');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`;
        }
    };
</script>

<header class="fixed top-0 inset-x-0 z-40 bg-alabaster-surface/90 backdrop-blur-md border-b border-taupe-light/20 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        <!-- Mobile Menu Toggle Button -->
        <div class="flex items-center md:hidden">
            <button 
                type="button"
                on:click={() => isMobileMenuOpen = !isMobileMenuOpen}
                class="p-2 -ml-2 text-charcoal hover:text-taupe focus:outline-none focus:ring-2 focus:ring-charcoal rounded-lg transition-colors"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle Navigation Menu"
            >
                {#if isMobileMenuOpen}
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                {:else}
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                    </svg>
                {/if}
            </button>
        </div>

        <!-- Brand Identity -->
        <div class="flex items-center">
            <a href="/" class="group flex items-center gap-2">
                <span class="text-2xl sm:text-3xl font-serif font-black tracking-widest uppercase text-charcoal group-hover:text-taupe transition-colors">
                    Cruzma
                </span>
            </a>
        </div>

        <!-- Desktop Navigation Links (Semantic HTML for SEO & Crawlers) -->
        <nav class="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase text-charcoal-muted" aria-label="Main Navigation">
            <a href="/shop" class="hover:text-charcoal transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-charcoal hover:after:w-full after:transition-all">
                Collection
            </a>
            <a href="/shop?category=apparel" class="hover:text-charcoal transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-charcoal hover:after:w-full after:transition-all">
                Apparel
            </a>
            <a href="/shop?category=objects" class="hover:text-charcoal transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-charcoal hover:after:w-full after:transition-all">
                Objects
            </a>
            <a href="/about" class="hover:text-charcoal transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-charcoal hover:after:w-full after:transition-all">
                Editorial
            </a>
        </nav>

        <!-- Utility Actions: Search & Reactive Cart -->
        <div class="flex items-center gap-2 sm:gap-4">
            <!-- Search Trigger -->
            <button 
                type="button" 
                on:click={() => isSearchOpen = !isSearchOpen}
                class="p-2 text-charcoal hover:text-taupe transition-colors rounded-full"
                aria-label="Search Catalog"
            >
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </button>

            <!-- Cart Drawer Trigger with Badge -->
            <button 
                type="button"
                on:click={toggleCart}
                class="flex items-center gap-2.5 px-3 py-2 rounded-full border border-charcoal/10 hover:border-charcoal/30 bg-alabaster hover:bg-white transition-all text-xs font-bold tracking-widest uppercase text-charcoal"
                aria-label="Open Cart"
            >
                <svg class="h-4 w-4 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25c-.67 0-1.188-.578-1.119-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <span class="hidden sm:inline">Bag</span>
                <span class="w-5 h-5 rounded-full bg-charcoal text-white flex items-center justify-center text-[10px] font-bold">
                    {cartCount}
                </span>
            </button>
        </div>
    </div>

    <!-- Collapsible Search Bar (Instant Filter Discovery) -->
    {#if isSearchOpen}
        <div class="border-t border-taupe-light/20 bg-alabaster px-4 sm:px-6 lg:px-8 py-3 transition-all">
            <form on:submit={handleSearchSubmit} class="max-w-3xl mx-auto flex items-center gap-3">
                <input 
                    type="search"
                    bind:value={searchQuery}
                    placeholder="Search curated essentials, artisan tote, linen shirts..."
                    class="w-full bg-white border border-taupe-light/30 rounded-xl px-4 py-2 text-sm text-charcoal focus:outline-none focus:border-charcoal transition-all placeholder:text-taupe"
                    autoFocus
                />
                <button type="submit" class="bg-charcoal text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-black transition-colors">
                    Search
                </button>
            </form>
        </div>
    {/if}

    <!-- Mobile Navigation Drawer (Thumb-Zone Optimized) -->
    {#if isMobileMenuOpen}
        <div id="mobile-menu" class="md:hidden border-t border-taupe-light/20 bg-alabaster px-6 py-6 space-y-4 shadow-xl">
            <nav class="flex flex-col space-y-3 font-serif text-lg tracking-tight" aria-label="Mobile Menu Navigation">
                <a href="/shop" on:click={() => isMobileMenuOpen = false} class="text-charcoal hover:text-taupe py-2 border-b border-taupe-light/10">
                    Full Collection
                </a>
                <a href="/shop?category=apparel" on:click={() => isMobileMenuOpen = false} class="text-charcoal hover:text-taupe py-2 border-b border-taupe-light/10">
                    Apparel & Linens
                </a>
                <a href="/shop?category=objects" on:click={() => isMobileMenuOpen = false} class="text-charcoal hover:text-taupe py-2 border-b border-taupe-light/10">
                    Curated Objects
                </a>
                <a href="/about" on:click={() => isMobileMenuOpen = false} class="text-charcoal hover:text-taupe py-2">
                    Our Philosophy
                </a>
            </nav>
            <div class="pt-4 border-t border-taupe-light/20 flex flex-col gap-2">
                <a href="/admin" class="text-xs text-taupe font-bold tracking-widest uppercase py-2">
                    Staff Portal →
                </a>
            </div>
        </div>
    {/if}
</header>

<!-- Offset spacer for fixed navbar -->
<div class="h-20" aria-hidden="true"></div>
