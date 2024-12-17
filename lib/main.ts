import { serve } from "../deps.ts";
import { renderFile } from "../deps.ts";

async function handler(req: { url: string | URL; }) {
  const url = new URL(req.url);

  if (url.pathname === "/") {
    try {
      const body = await renderFile("views/index.html");
      return new Response(body, {
        headers: { "Content-Type": "text/html" },
        status: 200,
      });
    } catch (error) {
      console.error("Erreur de rendu EJS :", error);
      return new Response("Erreur interne du serveur", { status: 500 });
    }
  }

  // Implémenter la requête api "/api/testimonials/top"

  return new Response("Page non trouvée", { status: 404 });
}

console.log(`🚀 Serveur Deno en cours d'exécution : http://localhost:8000`);
Deno.serve(handler);
