import { db } from '$lib/core/server/db';
import { products, productVariants } from '$lib/core/server/schema';
import { eq } from 'drizzle-orm';

export async function load() {
    // Join parent garments with their variants to grab images and colors
    const rawCatalog = await db.select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        basePrice: products.basePrice,
        imageUrl: productVariants.imageUrl,
    })
    .from(products)
    .leftJoin(productVariants, eq(products.id, productVariants.productId));

    // Deduplicate so we only show one main card per parent garment
    const uniqueProducts = [];
    const seen = new Set();
    
    for (const item of rawCatalog) {
        if (!seen.has(item.id)) {
            seen.add(item.id);
            uniqueProducts.push(item);
        }
    }

    return { catalog: uniqueProducts };
}
