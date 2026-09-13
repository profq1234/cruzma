import { error } from '@sveltejs/kit';
import { db } from '$lib/core/server/db';
import { products, productVariants } from '$lib/core/server/schema';
import { eq } from 'drizzle-orm';

export async function load({ params }) {
    // 1. Fetch the parent garment using the URL slug
    const [product] = await db
        .select()
        .from(products)
        .where(eq(products.slug, params.slug));

    if (!product) {
        throw error(404, 'Garment not found in our current collection.');
    }

    // 2. Fetch all specific sizes, colors, and inventory for this garment
    const variants = await db
        .select()
        .from(productVariants)
        .where(eq(productVariants.productId, product.id));

    return { product, variants };
}
