<script>
    import HeroLookbook from '$lib/ui/components/HeroLookbook.svelte';

    // Svelte Action: Intersection Observer for smooth scroll reveals
    function reveal(node) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    node.classList.add('!opacity-100', '!translate-y-0');
                    observer.unobserve(node); // Only animate once
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
        
        observer.observe(node);
        return { destroy() { observer.disconnect(); } };
    }

    const newArrivals = [
        { id: 'linen-shirt', name: 'Heavyweight Linen Shirt', price: '₹4,500', image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=800&auto=format&fit=crop', category: 'Apparel' },
        { id: 'wool-trouser', name: 'Pleated Wool Trouser', price: '₹6,200', image: 'https://images.unsplash.com/photo-1624378439575-d10c19a936d1?q=80&w=800&auto=format&fit=crop', category: 'Apparel' },
        { id: 'canvas-tote', name: 'Canvas Everyday Tote', price: '₹3,800', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop', category: 'Objects' },
        { id: 'leather-belt', name: 'Minimalist Leather Belt', price: '₹2,500', image: 'https://images.unsplash.com/photo-1628148674972-273a5a73e351?q=80&w=800&auto=format&fit=crop', category: 'Accessories' }
    ];
</script>

<svelte:head>
    <title>Manner | Curated Daily Essentials</title>
    <meta name="description" content="Precision tailoring for the modern wardrobe. Shop curated lifestyle and minimalist daily essentials." />
</svelte:head>

<!-- Tactile Film Grain Overlay -->
<div class="fixed inset-0 pointer-events-none z-[100] opacity-[0.04] mix-blend-multiply" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"></div>

<HeroLookbook />

<!-- Asymmetrical Category Grid -->
<section use:reveal class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 opacity-0 translate-y-12 transition-all duration-[1500ms] ease-[cubic-bezier(0.23,1,0.32,1)]">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 h-auto lg:h-[750px]">
        <a href="/shop?category=apparel" class="lg:col-span-7 group relative h-[500px] lg:h-full overflow-hidden bg-charcoal">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop" alt="Ready to Wear Collection" class="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-70 transition-all duration-1000 ease-out" loading="lazy" />
            <div class="absolute inset-0 p-10 flex flex-col justify-between bg-gradient-to-t from-charcoal/60 via-transparent to-transparent">
                <span class="text-white/80 text-[9px] font-bold tracking-[0.2em] uppercase">01 / Apparel</span>
                <div>
                    <h2 class="text-5xl lg:text-7xl font-serif text-white mb-4 tracking-tight">Ready-to-Wear</h2>
                    <span class="text-[9px] font-bold tracking-[0.2em] uppercase text-white hover:text-taupe transition-colors flex items-center gap-3">
                        Explore Collection <span class="group-hover:translate-x-3 transition-transform duration-500">→</span>
                    </span>
                </div>
            </div>
        </a>

        <div class="lg:col-span-5 grid grid-rows-2 gap-4 h-[800px] lg:h-full">
            <a href="/shop?category=objects" class="group relative overflow-hidden bg-charcoal">
                <img src="https://images.unsplash.com/photo-1595349585641-789a8034031d?q=80&w=1000&auto=format&fit=crop" alt="Curated Objects" class="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-70 transition-all duration-1000 ease-out" loading="lazy" />
                <div class="absolute inset-0 p-8 flex flex-col justify-between bg-gradient-to-t from-charcoal/60 via-transparent to-transparent">
                    <span class="text-white/80 text-[9px] font-bold tracking-[0.2em] uppercase">02 / Home</span>
                    <h2 class="text-4xl font-serif text-white tracking-tight">Objects</h2>
                </div>
            </a>
            <a href="/shop?category=accessories" class="group relative overflow-hidden bg-charcoal">
                <img src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1000&auto=format&fit=crop" alt="Accessories" class="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-70 transition-all duration-1000 ease-out" loading="lazy" />
                <div class="absolute inset-0 p-8 flex flex-col justify-between bg-gradient-to-t from-charcoal/60 via-transparent to-transparent">
                    <span class="text-white/80 text-[9px] font-bold tracking-[0.2em] uppercase">03 / Leather</span>
                    <h2 class="text-4xl font-serif text-white tracking-tight">Accessories</h2>
                </div>
            </a>
        </div>
    </div>
</section>

<!-- New Arrivals (Drag Cursor) -->
<section use:reveal class="py-16 sm:py-24 bg-alabaster border-t border-charcoal/5 opacity-0 translate-y-12 transition-all duration-[1500ms] ease-[cubic-bezier(0.23,1,0.32,1)]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex justify-between items-end">
        <h2 class="text-4xl font-serif text-charcoal tracking-tight">Just Arrived</h2>
        <a href="/shop" class="text-[9px] font-bold tracking-[0.2em] uppercase text-charcoal hover:opacity-70 transition-opacity">
            View All →
        </a>
    </div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 cursor-grab active:cursor-grabbing">
        <div class="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 no-scrollbar">
            {#each newArrivals as product}
                <a href={`/shop/${product.id}`} class="group min-w-[280px] sm:min-w-[340px] max-w-[340px] snap-start flex flex-col cursor-pointer">
                    <div class="relative aspect-[3/4] bg-charcoal/5 overflow-hidden mb-5">
                        <img src={product.image} alt={product.name} class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out" loading="lazy" />
                    </div>
                    <span class="text-[9px] font-bold tracking-[0.2em] uppercase text-taupe mb-1.5">{product.category}</span>
                    <h3 class="text-lg font-serif text-charcoal mb-1">{product.name}</h3>
                    <p class="text-sm font-medium text-charcoal/70">{product.price}</p>
                </a>
            {/each}
        </div>
    </div>
</section>

<!-- Parallax Campaign Break -->
<section use:reveal class="relative h-[70vh] min-h-[600px] w-full bg-charcoal flex items-center justify-center overflow-hidden opacity-0 translate-y-12 transition-all duration-[1500ms] ease-[cubic-bezier(0.23,1,0.32,1)]">
    <div class="absolute inset-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center bg-fixed opacity-40"></div>
    <div class="relative z-10 text-center text-white px-4 max-w-3xl">
        <h2 class="text-6xl sm:text-8xl font-serif font-black mb-6 text-balance tracking-tighter">The Shape of Things</h2>
        <p class="text-sm sm:text-lg text-alabaster-subtle mb-10 text-balance font-medium">
            Architectural silhouettes crafted for motion. Discover the new standard in everyday utility.
        </p>
        <a href="/shop" class="inline-block border-b border-white pb-1 text-[9px] font-bold tracking-[0.2em] uppercase hover:text-taupe-light hover:border-taupe-light transition-colors">
            Discover the Campaign
        </a>
    </div>
</section>

<!-- Material Philosophy -->
<section use:reveal class="py-32 sm:py-48 px-6 text-center max-w-5xl mx-auto opacity-0 translate-y-12 transition-all duration-[1500ms] ease-[cubic-bezier(0.23,1,0.32,1)]">
    <span class="text-[9px] font-bold tracking-[0.25em] uppercase text-taupe mb-8 block">Our Philosophy</span>
    <h2 class="text-4xl sm:text-6xl font-serif leading-tight sm:leading-[1.1] text-charcoal text-balance tracking-tight">
        True luxury is whispered. It lives in the weight of the cotton, the precision of the seam, and the quiet confidence of enduring design.
    </h2>
</section>

<!-- Dual-Image Editorial Spotlight -->
<section use:reveal class="py-24 bg-alabaster border-t border-charcoal/10 overflow-hidden opacity-0 translate-y-12 transition-all duration-[1500ms] ease-[cubic-bezier(0.23,1,0.32,1)]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div class="lg:col-span-5 flex flex-col justify-center items-start z-10 lg:pr-10">
            <span class="text-[9px] font-bold tracking-[0.2em] uppercase text-taupe mb-6 block">The Journal</span>
            <h2 class="text-5xl sm:text-6xl font-serif text-charcoal mb-6 text-balance tracking-tight">Designing for the Transitional Wardrobe</h2>
            <p class="text-base text-charcoal/70 leading-relaxed mb-10 text-balance">
                Explore our latest editorial analyzing the shift toward modular, seasonless garments engineered for unpredictability without sacrificing silhouette.
            </p>
            <a href="/about" class="text-[9px] font-bold tracking-[0.2em] uppercase text-charcoal pb-1 border-b border-charcoal hover:opacity-70 transition-opacity">
                Read the Entry
            </a>
        </div>
        <div class="lg:col-span-7 relative h-[600px] w-full">
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop" alt="Editorial Main" class="absolute right-0 top-0 w-4/5 h-[90%] object-cover shadow-2xl" loading="lazy" />
            <img src="https://images.unsplash.com/photo-1485230405346-71acb9518d9c?q=80&w=800&auto=format&fit=crop" alt="Editorial Detail" class="absolute left-0 bottom-0 w-1/2 h-2/3 object-cover shadow-xl border-4 border-alabaster" loading="lazy" />
        </div>
    </div>
</section>

<style>
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
