import 'dotenv/config';

/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./src/lib/core/server/schema.js",
    dialect: "postgresql",
    out: "./drizzle",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    }
};
