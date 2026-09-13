<script>
    import { createEventDispatcher } from 'svelte';

    export let cartCount = 0;
    
    const dispatch = createEventDispatcher();
    
    let isMobileMenuOpen = false;
    let isSearchOpen = false;
    let searchQuery = '';
    
    let y = 0;
    let lastY = 0;
    let isScrolled = false;
    let isHidden = false;

    $: {
        if (y > 50) {
            isScrolled = true;
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

<header 
    class="fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
    {isHidden ? '-translate-y-full' : 'translate-y-0'} 
    {isScrolled || isMobileMenuOpen || isSearchOpen ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)]' : 'bg-white'}"
>
    <!-- Top Utility Bar -->
    <div class="bg-charcoal text-alabaster-subtle text-[10px] font-bold tracking-[0.2em] uppercase text-center py-2 px-4 transition-transform duration-500 {isScrolled ? 'hidden' : 'block'}">
        Complimentary Global Shipping on orders over ₹15,000
    </div>

    <!-- Main Navbar: Switched to absolute centering to prevent flexbox collision -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative z-50">
        
        <!-- Left: Hamburger & Desktop Links -->
        <div class="flex-1 flex items-center justify-start">
            <button 
                type="button"
                on:click={() => { isMobileMenuOpen = !isMobileMenuOpen; isSearchOpen = false; }}
                class="lg:hidden p-2 -ml-2 text-charcoal hover:opacity-70 transition-opacity focus:outline-none"
                aria-label="Toggle Menu"
            >
                <div class="w-6 flex flex-col items-start gap-[5px]">
                    <span class="h-[1.5px] bg-charcoal transition-all duration-300 ease-out {isMobileMenuOpen ? 'w-6 rotate-45 translate-y-[6.5px]' : 'w-6'}"></span>
                    <span class="h-[1.5px] bg-charcoal transition-all duration-300 ease-out {isMobileMenuOpen ? 'opacity-0' : 'w-4'}"></span>
                    <span class="h-[1.5px] bg-charcoal transition-all duration-300 ease-out {isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-[6.5px]' : 'w-5'}"></span>
                </div>
            </button>

            <nav class="hidden lg:flex items-center gap-5 xl:gap-8 text-[11px] font-bold tracking-widest uppercase text-charcoal">
                <a href="/shop" class="relative group py-2">
                    <span class="relative z-10">The Collection</span>
                    <span class="absolute bottom-0 left-0 w-full h-[1px] bg-charcoal transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                </a>
                <a href="/shop?category=apparel" class="relative group py-2">
                    <span class="relative z-10">Ready-to-Wear</span>
                    <span class="absolute bottom-0 left-0 w-full h-[1px] bg-charcoal transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                </a>
                <a href="/about" class="relative group py-2">
                    <span class="relative z-10">About</span>
                    <span class="absolute bottom-0 left-0 w-full h-[1px] bg-charcoal transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                </a>
            </nav>
        </div>

        <!-- Center: Absolutely Positioned Brand Logo -->
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <a href="/" class="pointer-events-auto text-2xl sm:text-3xl font-serif font-black tracking-widest uppercase text-charcoal transition-opacity hover:opacity-70">
                Manner
            </a>
        </div>

        <!-- Right: Utility Icons -->
        <div class="flex-1 flex items-center justify-end gap-3 sm:gap-6">
            <button 
                type="button" 
                on:click={() => { isSearchOpen = !isSearchOpen; isMobileMenuOpen = false; }}
                class="text-charcoal hover:opacity-70 transition-opacity hidden sm:flex items-center gap-2"
                aria-label="Search"
            >
                {#if isSearchOpen}
                    <span class="text-[11px] font-bold tracking-widest uppercase">Close</span>
                {:else}
                    <svg class="h-5 w-5 stroke-[1.5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <span class="text-[11px] font-bold tracking-widest uppercase hidden lg:block">Search</span>
                {/if}
            </button>

            <a href="/login" class="hidden sm:block text-[11px] font-bold tracking-widest uppercase text-charcoal hover:opacity-70 transition-opacity">
                Login
            </a>

            <!-- Compact Mobile Cart -->
            <button 
                type="button"
                on:click={toggleCart}
                class="group flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 rounded-full border border-charcoal/20 hover:border-charcoal bg-white transition-all duration-300 shadow-sm hover:shadow-md"
            >
                <svg class="h-4 w-4 text-charcoal sm:hidden stroke-[1.5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25c-.67 0-1.188-.578-1.119-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <span class="hidden sm:block text-[10px] font-bold tracking-widest uppercase text-charcoal">Cart</span>
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
                    <svg class="h-6 w-6 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
            </div>
        </form>
    </div>
</header>

<!-- Editorial Mobile Menu Overlay -->
<div class="fixed inset-0 bg-white z-40 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] {isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}">
    <div class="flex flex-col h-full pt-36 px-6 pb-10 overflow-y-auto max-w-lg mx-auto w-full">
        
        <!-- Modern Minimal Search -->
        <form on:submit={handleSearchSubmit} class="mb-10 relative opacity-0 translate-y-4 transition-all duration-500 delay-100 border-b border-charcoal/20 pb-2 {isMobileMenuOpen ? '!opacity-100 !translate-y-0' : ''}">
            <input 
                type="search"
                bind:value={searchQuery}
                placeholder="Search catalog..."
                class="w-full bg-transparent text-xl font-serif text-charcoal focus:outline-none placeholder:text-charcoal/40"
            />
            <button type="submit" class="absolute right-0 top-1/2 -translate-y-1/2">
                <svg class="h-5 w-5 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
            </button>
        </form>

        <!-- Refined List Navigation -->
        <nav class="flex flex-col" aria-label="Mobile Navigation">
            {#each [
                { title: 'The Collection', href: '/shop' },
                { title: 'Ready-to-Wear', href: '/shop?category=apparel' },
                { title: 'About', href: '/about' },
                { title: 'Login', href: '/login' }
            ] as link, i}
                <a 
                    href={link.href} 
                    on:click={() => isMobileMenuOpen = false} 
                    class="group flex items-center justify-between py-5 border-b border-charcoal/10 text-2xl font-serif text-charcoal hover:px-2 transition-all duration-500 opacity-0 translate-y-8 {isMobileMenuOpen ? '!opacity-100 !translate-y-0' : ''}"
                    style="transition-delay: {150 + (i * 50)}ms"
                >
                    {link.title}
                    <svg class="h-4 w-4 opacity-30 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" /></svg>
                </a>
            {/each}
        </nav>
    </div>
</div>
