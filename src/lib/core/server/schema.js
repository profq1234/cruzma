import { pgTable, text, integer, timestamp, uuid } from 'drizzle-orm/pg-core';

// 1. Users Profile
export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').notNull().unique(),
    role: text('role').default('customer').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull()
});

// 2. Parent Product (The Garment Concept)
export const products = pgTable('products', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(), // e.g., 'cashmere-overcoat' for clean URLs
    description: text('description'),
    basePrice: integer('base_price').notNull(), // paise
    createdAt: timestamp('created_at').defaultNow().notNull()
});

// 3. SKUs & Variants (Sizes, Colors, and Specific Inventory)
export const productVariants = pgTable('product_variants', {
    id: uuid('id').primaryKey().defaultRandom(),
    productId: uuid('product_id').references(() => products.id).notNull(),
    sku: text('sku').notNull().unique(), // e.g., 'CRZ-CSH-OVR-L-BLK'
    size: text('size').notNull(), // 'S', 'M', 'L', 'Bespoke'
    color: text('color').notNull(),
    stockCount: integer('stock_count').default(0).notNull(), // Real inventory tracking, not just a toggle
    imageUrl: text('image_url'),
});

// 4. Orders (Financial Parent)
export const orders = pgTable('orders', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => users.id).notNull(),
    paymentIntentId: text('payment_intent_id'),
    totalAmount: integer('total_amount').notNull(), // paise
    status: text('status').default('pending').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull()
});

// 5. Line Items (What exactly was bought)
export const orderItems = pgTable('order_items', {
    id: uuid('id').primaryKey().defaultRandom(),
    orderId: uuid('order_id').references(() => orders.id).notNull(),
    variantId: uuid('variant_id').references(() => productVariants.id).notNull(),
    quantity: integer('quantity').notNull(),
    priceAtPurchase: integer('price_at_purchase').notNull() // Locks in price so historical orders don't break if you change prices later
});
