# Commande pour construire l'image Docker
setup:
	@docker compose build

# Commande pour démarrer les services Docker
up:
	@docker compose up -d

# Commande pour arrêter les services Docker
down:
	@docker compose down

# Commande pour voir les logs des services
logs:
	@docker compose logs -f

# Commande pour raffraichir le cache
refresh-cache:
	@docker compose exec server deno cache deps.ts

test:
	@docker compose exec server deno test
