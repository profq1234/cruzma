<script>
    export let data;
    
    // Reactive variables to auto-update if the user navigates between products
    $: ({ product, variants } = data);
    
    // Default to the first available variant for the UI
    $: selectedVariant = variants.length > 0 ? variants[0] : null;

    const formatPrice = (paise) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(paise / 100);
    };
</script>

<svelte:head>
    <title>{product.name} | Manner</title>
</svelte:head>

<section class="max-w-7xl mx-auto px-6 py-24 min-h-screen">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
        
        <!-- Left: Editorial Image -->
        <div class="relative w-full aspect-[4/5] bg-neutral-100">
            {#if selectedVariant?.imageUrl}
                <img 
                    src={selectedVariant.imageUrl} 
                    alt="{product.name} in {selectedVariant.color}" 
                    class="absolute inset-0 w-full h-full object-cover object-center"
                />
            {/if}
        </div>

        <!-- Right: Purchase Details -->
        <div class="flex flex-col justify-center">
            <h1 class="text-4xl font-serif tracking-tight text-neutral-900 mb-2">{product.name}</h1>
            <p class="text-xl text-neutral-600 mb-8">{formatPrice(product.basePrice)}</p>
            
            <p class="text-neutral-500 leading-relaxed mb-10 border-b border-neutral-200 pb-10">
                {product.description}
            </p>

            {#if variants.length > 0}
                <div class="mb-8">
                    <span class="block text-sm uppercase tracking-widest text-neutral-900 mb-4">Select Variant</span>
                    <div class="flex flex-wrap gap-4">
                        {#each variants as variant}
                            <button 
                                on:click={() => selectedVariant = variant}
                                class="px-6 py-3 border text-sm transition-colors duration-300
                                {selectedVariant?.id === variant.id ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 hover:border-neutral-900 text-neutral-600'}"
                            >
                                {variant.size} — {variant.color}
                            </button>
                        {/each}
                    </div>
                </div>

                <div class="mb-6 flex items-center justify-between text-sm">
                    <span class="text-neutral-500">Availability</span>
                    {#if selectedVariant.stockCount > 0}
                        <span class="text-green-700">In Stock ({selectedVariant.stockCount})</span>
                    {:else}
                        <span class="text-red-700">Made to Order</span>
                    {/if}
                </div>

                <button class="w-full bg-neutral-900 text-white py-4 uppercase tracking-widest text-sm hover:bg-neutral-800 transition-colors">
                    Add to Cart
                </button>
            {:else}
                <p class="text-red-700 italic">Currently out of stock.</p>
            {/if}
        </div>
    </div>
</section>
