<script>
    export let data;
    
    // Format paise (e.g., 8990000) to Indian Rupees (₹89,900)
    const formatPrice = (paise) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(paise / 100);
    };
</script>

<svelte:head>
    <title>Shop | Manner</title>
</svelte:head>

<section class="max-w-7xl mx-auto px-6 py-24">
    <div class="mb-16">
        <h1 class="text-4xl font-serif tracking-tight text-neutral-900 mb-4">The Collection</h1>
        <p class="text-neutral-500 max-w-xl">Quiet luxury essentials tailored from the world's finest materials. Designed for permanence.</p>
    </div>

    <!-- Editorial Masonry/Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {#each data.catalog as item}
            <a href="/shop/{item.slug}" class="group block cursor-pointer">
                <div class="relative w-full aspect-[4/5] bg-neutral-100 overflow-hidden mb-6">
                    {#if item.imageUrl}
                        <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            class="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                    {:else}
                        <div class="absolute inset-0 flex items-center justify-center text-neutral-300 font-serif">
                            Manner
                        </div>
                    {/if}
                    <!-- Subtle overlay on hover -->
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                </div>

                <div class="flex justify-between items-baseline">
                    <h2 class="text-lg font-serif text-neutral-900">{item.name}</h2>
                    <span class="text-sm font-medium text-neutral-600">{formatPrice(item.basePrice)}</span>
                </div>
                <p class="text-sm text-neutral-400 mt-1">Explore Colors & Sizes</p>
            </a>
        {/each}
    </div>
</section>
