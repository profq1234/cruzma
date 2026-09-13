<section class="relative h-[85vh] min-h-[600px] w-full bg-charcoal flex items-center justify-center overflow-hidden">
    <!-- LCP Optimization: fetchpriority high, eager loading, explicit object positioning -->
    <img 
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop" 
        alt="Manner Autumn Collection Lookbook" 
        class="absolute inset-0 w-full h-full object-cover opacity-80" 
        fetchpriority="high"
        loading="eager"
    />
    
    <!-- Gradient Overlay for WCAG Text Contrast -->
    <div class="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent"></div>
    <div class="absolute inset-0 bg-black/10"></div>

    <div class="relative z-10 text-center text-white px-4 flex flex-col items-center max-w-4xl mx-auto">
        <span class="text-xs font-bold tracking-[0.3em] uppercase mb-4 text-alabaster-subtle drop-shadow-md">
            New Arrival
        </span>
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-serif font-black mb-6 drop-shadow-xl text-balance tracking-tight">
            The Autumn Edit
        </h1>
        <p class="text-base md:text-lg text-alabaster-subtle mb-10 max-w-lg mx-auto drop-shadow-md font-medium text-balance">
            Elevate your transition into the new season with our curated collection of textural layers and earth tones.
        </p>
        <a 
            href="/shop" 
            class="group inline-flex items-center justify-center gap-2 border border-white/80 bg-white/10 backdrop-blur-md px-10 py-4 text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-charcoal transition-all duration-300"
            aria-label="Shop the Autumn Collection"
        >
            Explore Collection
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </a>
    </div>
</section>
