<footer class="bg-charcoal text-alabaster pt-20 pb-10 mt-auto border-t border-charcoal-light">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
            
            <!-- Brand & Trust Signals -->
            <div class="md:col-span-4 lg:col-span-5 flex flex-col gap-6">
                <h2 class="text-3xl font-serif font-black tracking-widest uppercase">Cruzma</h2>
                <p class="text-sm text-taupe-light leading-relaxed max-w-sm text-balance">
                    Curated lifestyle and minimalist daily essentials with direct-to-consumer craft. Designed for the modern wardrobe.
                </p>
                <div class="flex items-center gap-4 text-taupe mt-2">
                    <span class="sr-only">Accepted Payment Methods</span>
                    <!-- Semantic Trust Badges -->
                    <div class="flex gap-2 opacity-70">
                        <svg class="h-6 w-auto" viewBox="0 0 38 24" fill="none"><rect width="38" height="24" rx="4" fill="#262626"/><path d="M22.93 9.47L21.36 18H18.94L20.51 9.47H22.93ZM28.84 9.47H26.35C25.96 9.47 25.62 9.69 25.47 10.04L21.84 18H24.38L24.89 16.59H27.97L28.27 18H30.5L28.84 9.47ZM25.59 14.65L26.6 11.83L27.18 14.65H25.59ZM17.26 9.47L14.73 18H12.33L14.86 9.47H17.26ZM11.19 9.47L8.74 15.35L8.43 14.12C8.01 12.38 6.64 10.42 4.14 9.47L4.85 11.75C6.16 12.29 6.84 13.06 7.21 14.12L8.74 18H11.3L15.35 9.47H12.8C12.44 9.47 12.08 9.68 11.93 10.04L11.19 9.47Z" fill="white"/></svg>
                        <span class="text-xs font-bold border border-charcoal-muted px-2 py-1 rounded">UPI</span>
                        <span class="text-xs font-bold border border-charcoal-muted px-2 py-1 rounded">NetBanking</span>
                    </div>
                </div>
            </div>

            <!-- Quick Links -->
            <div class="md:col-span-3 lg:col-span-3 flex flex-col gap-4">
                <h3 class="text-xs font-bold tracking-widest uppercase text-white mb-2">Support</h3>
                <nav class="flex flex-col gap-3 text-sm text-taupe-light" aria-label="Footer Support Navigation">
                    <a href="/shop" class="hover:text-white transition-colors w-fit">All Collections</a>
                    <a href="/shipping" class="hover:text-white transition-colors w-fit">Shipping & Returns</a>
                    <a href="/contact" class="hover:text-white transition-colors w-fit">Contact Us</a>
                </nav>
            </div>

            <!-- Newsletter Opt-In (Accessible Form) -->
            <div class="md:col-span-5 lg:col-span-4 flex flex-col gap-4">
                <h3 class="text-xs font-bold tracking-widest uppercase text-white mb-2">The Editorial</h3>
                <p class="text-sm text-taupe-light mb-2">Subscribe for private editorial releases and early access to drops.</p>
                <form class="flex flex-col sm:flex-row gap-3" on:submit|preventDefault={() => alert('Newsletter connected!')}>
                    <label for="email-address" class="sr-only">Email address</label>
                    <input 
                        id="email-address" 
                        name="email" 
                        type="email" 
                        autocomplete="email" 
                        required 
                        class="min-w-0 flex-auto rounded-lg border-0 bg-charcoal-light px-4 py-3 text-white shadow-sm ring-1 ring-inset ring-charcoal-muted focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm transition-all outline-none" 
                        placeholder="Enter your email"
                    >
                    <button type="submit" class="flex-none rounded-lg bg-white px-6 py-3 text-sm font-bold text-charcoal shadow-sm hover:bg-alabaster-subtle transition-colors uppercase tracking-wider">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>

        <div class="border-t border-charcoal-muted/30 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p class="text-xs text-taupe">© {new Date().getFullYear()} Cruzma. All rights reserved.</p>
            <div class="flex gap-6 text-xs text-taupe">
                <a href="/privacy" class="hover:text-white transition-colors">Privacy Policy</a>
                <a href="/terms" class="hover:text-white transition-colors">Terms of Service</a>
            </div>
        </div>
    </div>
</footer>
