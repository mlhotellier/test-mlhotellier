/**
 * Use this script to import deps
 * Finaly we just have to `deno cache deps.ts` for the entire application
 */
export { serve} from "https://deno.land/std@0.223.0/http/server.ts";
export { renderFile } from "https://deno.land/x/deno_ejs@v0.3.1/mod.ts";
