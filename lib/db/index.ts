import { drizzle } from "drizzle-orm/node-postgres";
import cfg from "@/lib/config";

export const db = drizzle(cfg.db.url);
