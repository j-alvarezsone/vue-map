import { z } from "zod";

const envSchema = z.object({
  VITE_MAPBOX_API_KEY: z.string(),
});

export const env = envSchema.parse(import.meta.env);
