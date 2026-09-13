<script>
    import { createEventDispatcher, onMount } from 'svelte';

    export let cartCount = 0;
    
    const dispatch = createEventDispatcher();
    
    let isMobileMenuOpen = false;
    let isSearchOpen = false;
    let searchQuery = '';
    
    // Smart Scroll State
    let y = 0;
    let lastY = 0;
    let isScrolled = false;
    let isHidden = false;

    $: {
        if (y > 50) {
            isScrolled = true;
            // Hide header on scroll down, show on scroll up (unless a menu is open)
            if (y > lastY && y > 200 && !isMobileMenuOpen && !isSearchOpen) {
                isHidden = true;
            } else {
                isHidden = false;
            }
        } else {
            isScrolled = false;
            isHidden = false;
        }
        lastY = y;
    }

    // Prevent body scroll when mobile menu is open
    $: if (typeof document !== 'undefined') {
        document.body.style.overflow = (isMobileMenuOpen || isSearchOpen) ? 'hidden' : 'auto';
    }

    const toggleCart = () => dispatch('toggleCart');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`;
        }
    };
</script>

<svelte:window bind:scrollY={y} />

<!-- Smart Header Container -->
<header 
    class="fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
    {isHidden ? '-translate-y-full' : 'translate-y-0'} 
    {isScrolled || isMobileMenuOpen || isSearchOpen ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)]' : 'bg-transparent'}"
>
    <!-- Top Utility Bar (Optional: Free Shipping Banner) -->
    <div class="bg-charcoal text-alabaster-subtle text-[10px] font-bold tracking-[0.2em] uppercase text-center py-2 px-4 transition-transform duration-500 {isScrolled ? 'hidden' : 'block'}">
        Complimentary Global Shipping on orders over ₹15,000
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative z-50">
        
        <!-- Mobile Menu Toggle (Animated Hamburger) -->
        <div class="flex-1 md:hidden">
            <button 
                type="button"
                on:click={() => { isMobileMenuOpen = !isMobileMenuOpen; isSearchOpen = false; }}
                class="p-2 -ml-2 text-charcoal hover:opacity-70 transition-opacity focus:outline-none"
                aria-label="Toggle Menu"
            >
                <div class="w-6 flex flex-col items-end gap-[5px]">
                    <span class="h-[1.5px] bg-charcoal transition-all duration-300 ease-out {isMobileMenuOpen ? 'w-6 rotate-45 translate-y-[6.5px]' : 'w-6'}"></span>
                    <span class="h-[1.5px] bg-charcoal transition-all duration-300 ease-out {isMobileMenuOpen ? 'opacity-0' : 'w-4'}"></span>
                    <span class="h-[1.5px] bg-charcoal transition-all duration-300 ease-out {isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-[6.5px]' : 'w-5'}"></span>
                </div>
            </button>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex flex-1 items-center gap-8 text-xs font-bold tracking-widest uppercase text-charcoal">
            <a href="/shop" class="relative group py-2">
                <span class="relative z-10">Shop All</span>
                <span class="absolute bottom-0 left-0 w-full h-[1px] bg-charcoal transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </a>
            <a href="/shop?category=apparel" class="relative group py-2">
                <span class="relative z-10">Apparel</span>
                <span class="absolute bottom-0 left-0 w-full h-[1px] bg-charcoal transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </a>
            <a href="/about" class="relative group py-2">
                <span class="relative z-10">Editorial</span>
                <span class="absolute bottom-0 left-0 w-full h-[1px] bg-charcoal transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </a>
        </nav>

        <!-- Centered Brand -->
        <div class="flex justify-center flex-1 md:flex-none">
            <a href="/" class="text-3xl font-serif font-black tracking-widest uppercase text-charcoal transition-opacity hover:opacity-70">
                Cruzma
            </a>
        </div>

        <!-- Utility Icons (Search & Cart) -->
        <div class="flex-1 flex items-center justify-end gap-3 sm:gap-5">
            <!-- Search Toggle -->
            <button 
                type="button" 
                on:click={() => { isSearchOpen = !isSearchOpen; isMobileMenuOpen = false; }}
                class="text-charcoal hover:opacity-70 transition-opacity hidden sm:block"
                aria-label="Search"
            >
                {#if isSearchOpen}
                    <span class="text-xs font-bold tracking-widest uppercase">Close</span>
                {:else}
                    <svg class="h-5 w-5 stroke-[1.5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                {/if}
            </button>

            <!-- Modern Cart Pill -->
            <button 
                type="button"
                on:click={toggleCart}
                class="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-charcoal/20 hover:border-charcoal bg-white transition-all duration-300 shadow-sm hover:shadow-md"
            >
                <span class="text-[11px] font-bold tracking-widest uppercase text-charcoal">Bag</span>
                <span class="relative flex h-5 w-5 items-center justify-center">
                    {#if cartCount > 0}
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-charcoal opacity-20"></span>
                    {/if}
                    <span class="relative inline-flex rounded-full h-5 w-5 bg-charcoal text-white items-center justify-center text-[10px] font-bold transform group-hover:scale-110 transition-transform">
                        {cartCount}
                    </span>
                </span>
            </button>
        </div>
    </div>

    <!-- Fluid Search Overlay -->
    <div class="absolute top-full left-0 w-full bg-white border-t border-charcoal/5 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden origin-top {isSearchOpen ? 'max-h-64 opacity-100 py-8' : 'max-h-0 opacity-0 py-0'}">
        <form on:submit={handleSearchSubmit} class="max-w-3xl mx-auto px-4 flex flex-col gap-4">
            <div class="relative">
                <input 
                    type="search"
                    bind:value={searchQuery}
                    placeholder="Search for essentials..."
                    class="w-full bg-transparent border-b-2 border-charcoal/20 focus:border-charcoal text-2xl font-serif text-charcoal py-3 pl-0 pr-10 outline-none transition-colors placeholder:text-charcoal/30"
                />
                <button type="submit" class="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:opacity-70 transition-opacity">
                    <svg class="h-6 w-6 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
            <div class="flex gap-4 text-xs font-bold uppercase tracking-wider text-charcoal/50">
                <span>Popular:</span>
                <a href="/shop?q=linen" class="hover:text-charcoal transition-colors">Linen</a>
                <a href="/shop?q=tote" class="hover:text-charcoal transition-colors">Canvas Tote</a>
            </div>
        </form>
    </div>
</header>

<!-- Full-Screen Mobile Menu Overlay -->
<div class="fixed inset-0 bg-white z-40 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] {isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}">
    <div class="flex flex-col h-full pt-32 px-6 pb-10 overflow-y-auto">
        
        <!-- Mobile Search -->
        <form on:submit={handleSearchSubmit} class="mb-12 relative opacity-0 translate-y-4 transition-all duration-500 delay-100 {isMobileMenuOpen ? '!opacity-100 !translate-y-0' : ''}">
            <input 
                type="search"
                bind:value={searchQuery}
                placeholder="Search..."
                class="w-full bg-alabaster-subtle rounded-xl px-5 py-4 text-base text-charcoal focus:outline-none focus:ring-1 focus:ring-charcoal/20"
            />
            <button type="submit" class="absolute right-4 top-1/2 -translate-y-1/2">
                <svg class="h-5 w-5 text-charcoal/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
            </button>
        </form>

        <nav class="flex flex-col gap-6" aria-label="Mobile Navigation">
            {#each [
                { title: 'Shop Collection', href: '/shop' },
                { title: 'Apparel', href: '/shop?category=apparel' },
                { title: 'Objects & Home', href: '/shop?category=objects' },
                { title: 'The Editorial', href: '/about' }
            ] as link, i}
                <a 
                    href={link.href} 
                    on:click={() => isMobileMenuOpen = false} 
                    class="text-4xl sm:text-5xl font-serif font-black tracking-tight text-charcoal hover:opacity-70 transition-all duration-500 opacity-0 translate-y-8 {isMobileMenuOpen ? '!opacity-100 !translate-y-0' : ''}"
                    style="transition-delay: {150 + (i * 50)}ms"
                >
                    {link.title}
                </a>
            {/each}
        </nav>

        <div class="mt-auto pt-12 border-t border-charcoal/10 flex flex-col gap-4 opacity-0 transition-opacity duration-500 delay-500 {isMobileMenuOpen ? '!opacity-100' : ''}">
            <a href="/admin" class="text-xs font-bold tracking-widest uppercase text-taupe hover:text-charcoal transition-colors">
                Staff Portal →
            </a>
            <div class="flex gap-4 mt-2">
                <a href="#" class="text-charcoal hover:opacity-70"><span class="sr-only">Instagram</span>IG</a>
                <a href="#" class="text-charcoal hover:opacity-70"><span class="sr-only">Pinterest</span>PN</a>
            </div>
        </div>
    </div>
</div>
