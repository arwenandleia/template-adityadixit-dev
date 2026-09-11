import cfg from "./lib/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schemas/**/*.ts",
  out: "./lib/db/migrations/prod",
  dialect: "postgresql",
  dbCredentials: {
    url: cfg.db.urlProd,
    ssl: "require",
  },
});
