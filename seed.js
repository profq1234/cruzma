import 'dotenv/config';
import dns from 'node:dns';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { products, productVariants } from './src/lib/core/server/schema.js';

// 1. Force Node to resolve using IPv4
dns.setDefaultResultOrder('ipv4first');

// 2. Intercept and force the connection pooler port (6543) bypassing Vite's cache
const dbUrl = process.env.DATABASE_URL.replace(':5432', ':6543');

const client = postgres(dbUrl, { prepare: false });
const db = drizzle(client);

async function seed() {
    try {
        console.log('Connecting to Supabase...');
        const insertedProducts = await db.insert(products).values([
            {
                name: 'The Cashmere Overcoat',
                slug: 'cashmere-overcoat',
                description: 'A tailored overcoat spun from pure Mongolian cashmere. Features structured shoulders, a hidden placket, and quiet luxury minimalism.',
                basePrice: 8990000 
            },
            {
                name: 'Silk Blend Turtleneck',
                slug: 'silk-blend-turtleneck',
                description: 'Seamless construction woven with a silk-merino blend for temperature regulation and an elegant, second-skin fit.',
                basePrice: 2450000 
            },
            {
                name: 'Bespoke Wool Trousers',
                slug: 'bespoke-wool-trousers',
                description: 'High-waisted trousers cut from heavyweight Italian wool. Finished with side adjusters and a sharp front crease.',
                basePrice: 3200000 
            }
        ]).returning();

        console.log('Injecting SKU Variants...');
        await db.insert(productVariants).values([
            { productId: insertedProducts[0].id, sku: 'CHZ-CSH-OVR-M-CHR', size: 'M', color: 'Charcoal', stockCount: 5, imageUrl: 'https://images.unsplash.com/photo-1520975954732-57dd22299614?w=800&q=80' },
            { productId: insertedProducts[0].id, sku: 'CHZ-CSH-OVR-L-CHR', size: 'L', color: 'Charcoal', stockCount: 2, imageUrl: 'https://images.unsplash.com/photo-1520975954732-57dd22299614?w=800&q=80' },
            { productId: insertedProducts[1].id, sku: 'CHZ-SLK-TRT-S-ALA', size: 'S', color: 'Alabaster', stockCount: 8, imageUrl: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800&q=80' },
            { productId: insertedProducts[1].id, sku: 'CHZ-SLK-TRT-M-ALA', size: 'M', color: 'Alabaster', stockCount: 12, imageUrl: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800&q=80' },
            { productId: insertedProducts[2].id, sku: 'CHZ-WOL-TRS-32-TAU', size: '32', color: 'Taupe', stockCount: 15, imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80' }
        ]);

        console.log('Manner catalog seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
}

seed();
