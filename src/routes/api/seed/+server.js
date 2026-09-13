import { json } from '@sveltejs/kit';
import { db } from '$lib/core/server/db';
import { products, productVariants } from '$lib/core/server/schema';

export async function GET() {
    try {
        // 1. Insert Parent Garments
        const insertedProducts = await db.insert(products).values([
            {
                name: 'The Cashmere Overcoat',
                slug: 'cashmere-overcoat',
                description: 'A tailored overcoat spun from pure Mongolian cashmere. Features structured shoulders, a hidden placket, and quiet luxury minimalism.',
                basePrice: 8990000 // ₹89,900.00
            },
            {
                name: 'Silk Blend Turtleneck',
                slug: 'silk-blend-turtleneck',
                description: 'Seamless construction woven with a silk-merino blend for temperature regulation and an elegant, second-skin fit.',
                basePrice: 2450000 // ₹24,500.00
            },
            {
                name: 'Bespoke Wool Trousers',
                slug: 'bespoke-wool-trousers',
                description: 'High-waisted trousers cut from heavyweight Italian wool. Finished with side adjusters and a sharp front crease.',
                basePrice: 3200000 // ₹32,000.00
            }
        ]).returning();

        // 2. Insert Specific SKUs & Sizes tied to the generated Product IDs
        await db.insert(productVariants).values([
            // Cashmere Overcoat Variants
            {
                productId: insertedProducts[0].id,
                sku: 'CHZ-CSH-OVR-M-CHR',
                size: 'M',
                color: 'Charcoal',
                stockCount: 5,
                imageUrl: 'https://images.unsplash.com/photo-1520975954732-57dd22299614?w=800&q=80'
            },
            {
                productId: insertedProducts[0].id,
                sku: 'CHZ-CSH-OVR-L-CHR',
                size: 'L',
                color: 'Charcoal',
                stockCount: 2,
                imageUrl: 'https://images.unsplash.com/photo-1520975954732-57dd22299614?w=800&q=80'
            },
            // Silk Turtleneck Variants
            {
                productId: insertedProducts[1].id,
                sku: 'CHZ-SLK-TRT-S-ALA',
                size: 'S',
                color: 'Alabaster',
                stockCount: 8,
                imageUrl: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800&q=80'
            },
            {
                productId: insertedProducts[1].id,
                sku: 'CHZ-SLK-TRT-M-ALA',
                size: 'M',
                color: 'Alabaster',
                stockCount: 12,
                imageUrl: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800&q=80'
            },
            // Wool Trouser Variants
            {
                productId: insertedProducts[2].id,
                sku: 'CHZ-WOL-TRS-32-TAU',
                size: '32',
                color: 'Taupe',
                stockCount: 15,
                imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80'
            }
        ]);

        return json({ success: true, message: 'Manner luxury catalog seeded successfully.' });
    } catch (err) {
        console.error('Seeding error:', err);
        return json({ error: 'Failed to seed catalog' }, { status: 500 });
    }
}
