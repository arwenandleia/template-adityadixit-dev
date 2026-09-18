import { drizzle } from "drizzle-orm/node-postgres";
import cfg from "@/lib/config";
import { authRelations } from "./schemas/auth-schema";

export const db = drizzle(cfg.db.url, {
  relations: { ...authRelations },
});
