import { serve } from "../deps.ts";
import { renderFile } from "../deps.ts";
import { join, extname } from "https://deno.land/std/path/mod.ts";
import { getThreeTopTestimonials, testimonials } from "./testimonials.ts"; 

async function handler(req: { url: string | URL; }) {
  const url = new URL(req.url);

  // Servir le fichier index.html
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

  // Servir le favicon.ico
  if (url.pathname === "/favicon.ico") {
    try {
      const favicon = await renderFile("view/static/favicon.ico")
      return new Response(favicon, {
        headers: { "Content-Type": "image/x-icon" },
        status: 200,
      });
    } catch (error) {
      console.error("Erreur de lecture du fichier favicon :", error);
      return new Response("Fichier favicon non trouvé", { status: 404 });
    }
  }

  // Servir le fichier style.css
  if (url.pathname === "/style.css") {
    try {
      const css = await renderFile("views/style.min.css");
      return new Response(css, {
        headers: { 
          "Content-Type": "text/css", 
          "Cache-Control": "public, max-age=31536000, immutable"
        },
        status: 200,
      });
    } catch (error) {
      console.error("Erreur de lecture du fichier CSS :", error);
      try {
        const cssFallback = await renderFile("views/style.css");
        return new Response(cssFallback, {
          headers: { "Content-Type": "text/css" },
          status: 200,
        });
      } catch (fallbackError) {
        console.error("Erreur de lecture du fichier CSS de secours :", fallbackError);
        return new Response("Erreur de fichier CSS", { status: 500 });
      }
    }
  }

  // Servir le fichier main.js
  if (url.pathname === "/main.js") {
    try {
      const js = await renderFile("views/main.min.js");
      return new Response(js, {
        headers: { 
          "Content-Type": "application/javascript",
          "Cache-Control": "public, max-age=31536000, immutable"
        },
        status: 200,
      });
    } catch (error) {
      console.error("Erreur de lecture du fichier JS :", error);
      try {
        const jsFallback = await renderFile("views/main.js");
        return new Response(jsFallback, {
          headers: { "Content-Type": "application/javascript" },
          status: 200,
        });
      } catch (fallbackError) {
        console.error("Erreur de lecture du fichier JS de secours :", fallbackError);
        return new Response("Erreur de fichier JS", { status: 500 });
      }
    }
  }

  // Servir les fichiers statiques (images, icônes, etc.)
  if (url.pathname.startsWith("/static/")) {
    try {
      const filePath = join("views", url.pathname);
      const ext = extname(filePath);
      let contentType = "application/octet-stream";

      // Déterminer le type de contenu
      if (ext === ".svg") contentType = "image/svg+xml";
      else if (ext === ".png") contentType = "image/png";
      else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
      else if (ext === ".gif") contentType = "image/gif";

      // Lire le fichier
      const file = await renderFile(filePath);
      return new Response(file, {
        headers: { "Content-Type": contentType },
        status: 200,
      });
    } catch (error) {
      console.error("Erreur de lecture du fichier statique :", error);
      return new Response("Fichier non trouvé", { status: 404 });
    }
  }

  // Servir les fichiers logo_clients.svg
  if (url.pathname.startsWith("/static/clients_logos/")) {
    try {
      const filePath = join("views", url.pathname);
      const ext = extname(filePath);
      let contentType = "application/octet-stream";

      // Déterminer le type de contenu
      if (ext === ".svg") contentType = "image/svg+xml";
      else if (ext === ".png") contentType = "image/png";
      else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
      else if (ext === ".gif") contentType = "image/gif";

      // Lire le fichier
      const file = await renderFile(filePath);
      return new Response(file, {
        headers: { "Content-Type": contentType },
        status: 200,
      });
    } catch (error) {
      console.error("Erreur de lecture du fichier statique :", error);
      return new Response("Fichier non trouvé", { status: 404 });
    }
  }

  // Implémenter la requête api "/api/testimonials/top"
  if (url.pathname === "/api/testimonials/top") {
    const topTestimonials = getThreeTopTestimonials(testimonials);
    return new Response(JSON.stringify(topTestimonials), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
       },
      status: 200,
    });
  }

  // Servir les fichiers JS généré par Vite
  if (url.pathname === "/public/assets/index.js") {
    try {
      const manifestPath = "views/public/.vite/manifest.json";
      const manifest = JSON.parse(await renderFile(manifestPath));      
      const jsFile = manifest["index.html"].file;
      const jsContent = await renderFile(`views/public/${jsFile}`);
      return new Response(jsContent, {
        headers: { "Content-Type": "application/javascript" },
        status: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la lecture du fichier JS :", error);
      return new Response("Erreur de fichier JS", { status: 500 });
    }
  }
  
  return new Response("Not Found", { status: 404 });  
}

console.log(`🚀 Serveur Deno en cours d'exécution : http://localhost:8000`);
Deno.serve(handler);
